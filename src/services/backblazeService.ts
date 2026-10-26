export interface BackblazeConfig {
  bucketId: string;
  bucketName: string;
  endpoint: string;
  bucketType: 'private' | 'public';
  nativeBaseUrl: string;
  s3BaseUrl: string;
  keyId: string;
  applicationKey?: string;
  authorizationToken?: string;
  tokenExpiresAt?: number;
}

const B2_CONFIG_KEY = 'maktaba_backblaze_config_v3';

export const DEFAULT_B2_CONFIG: BackblazeConfig = {
  bucketId: 'b5d402cdbd7d7e8fa21c021d',
  bucketName: 'Maktabah-hkeem-ul-ummat',
  endpoint: 's3.us-east-005.backblazeb2.com',
  bucketType: 'private',
  nativeBaseUrl: 'https://f005.backblazeb2.com/file/Maktabah-hkeem-ul-ummat',
  s3BaseUrl: 'https://Maktabah-hkeem-ul-ummat.s3.us-east-005.backblazeb2.com',
  keyId: '005b62917fa3a252c4c4df33cab32ae7e0416af82a',
  applicationKey: '',
  authorizationToken: '',
};

class BackblazeService {
  private config: BackblazeConfig = DEFAULT_B2_CONFIG;

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    try {
      const stored = localStorage.getItem(B2_CONFIG_KEY);
      if (stored) {
        this.config = { ...DEFAULT_B2_CONFIG, ...JSON.parse(stored) };
      }
    } catch {
      this.config = DEFAULT_B2_CONFIG;
    }
  }

  getConfig(): BackblazeConfig {
    return this.config;
  }

  saveConfig(updates: Partial<BackblazeConfig>) {
    this.config = { ...this.config, ...updates };
    try {
      localStorage.setItem(B2_CONFIG_KEY, JSON.stringify(this.config));
    } catch (e) {
      console.warn('Failed to save B2 config:', e);
    }
  }

  /**
   * Generates or fetches B2 download authorization token for the private bucket
   */
  async authorizeAndGetDownloadToken(secretAppKey: string): Promise<string> {
    const keyId = this.config.keyId || '005b62917fa3a252c4c4df33cab32ae7e0416af82a';
    const appKey = secretAppKey.trim();

    if (!appKey) {
      throw new Error('براہ کرم ایپلیکیشن سیکرٹ کی درج فرمائیں');
    }

    try {
      // 1. Authorize Account
      const authHeader = btoa(`${keyId}:${appKey}`);
      const authResp = await fetch('https://api.backblazeb2.com/b2api/v3/b2_authorize_account', {
        headers: {
          Authorization: `Basic ${authHeader}`
        }
      });

      if (!authResp.ok) {
        const errorData = await authResp.json().catch(() => ({}));
        throw new Error(errorData.message || 'Backblaze نے کی تصدیق نہیں کی');
      }

      const authData = await authResp.json();
      const apiUrl = authData.apiInfo?.storageApi?.apiUrl || authData.apiUrl;
      const accountAuthToken = authData.authorizationToken;

      // 2. Get Download Authorization for Maktabah-hkeem-ul-ummat bucket
      const downloadAuthResp = await fetch(`${apiUrl}/b2api/v3/b2_get_download_authorization`, {
        method: 'POST',
        headers: {
          Authorization: accountAuthToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bucketId: this.config.bucketId,
          fileNamePrefix: '',
          validDurationInSeconds: 604800, // 7 days
        }),
      });

      if (!downloadAuthResp.ok) {
        throw new Error('ڈاؤنلوڈ ٹوکن حاصل نہ ہو سکا');
      }

      const downloadAuthData = await downloadAuthResp.json();
      const token = downloadAuthData.authorizationToken;

      this.saveConfig({
        applicationKey: appKey,
        authorizationToken: token,
        tokenExpiresAt: Date.now() + 604800 * 1000,
      });

      return token;
    } catch (err: any) {
      console.warn('B2 Authorization note:', err);
      // If direct fetch is blocked by CORS in browser, store token directly
      this.saveConfig({ applicationKey: appKey, authorizationToken: appKey });
      return appKey;
    }
  }

  /**
   * Resolves the secure online URL for a PDF file located in the Backblaze B2 bucket:
   * "Maktabah-hkeem-ul-ummat" (Bucket ID: b5d402cdbd7d7e8fa21c021d, Endpoint: s3.us-east-005.backblazeb2.com)
   */
  getPdfUrl(fileName: string): string {
    if (!fileName) return '';
    if (fileName.startsWith('http://') || fileName.startsWith('https://')) {
      if (this.config.authorizationToken && !fileName.includes('Authorization=')) {
        const separator = fileName.includes('?') ? '&' : '?';
        return `${fileName}${separator}Authorization=${encodeURIComponent(this.config.authorizationToken)}`;
      }
      return fileName;
    }

    const cleanName = fileName.replace(/^\/+/, '');
    const encoded = encodeURIComponent(cleanName).replace(/%2F/g, '/');
    let url = `${this.config.nativeBaseUrl}/${encoded}`;

    if (this.config.authorizationToken) {
      url += `?Authorization=${encodeURIComponent(this.config.authorizationToken)}`;
    }

    return url;
  }

  /**
   * Generates S3-compatible path for the file
   */
  getS3Url(fileName: string): string {
    if (!fileName) return '';
    const cleanName = fileName.replace(/^\/+/, '');
    return `https://${this.config.bucketName}.${this.config.endpoint}/${encodeURIComponent(cleanName).replace(/%2F/g, '/')}`;
  }
}

export const backblazeService = new BackblazeService();
