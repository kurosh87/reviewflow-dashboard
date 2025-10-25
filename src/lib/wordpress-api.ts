/**
 * WordPress API Client
 *
 * Connects to ReviewFlow WordPress REST API with authentication
 */

import axios, { AxiosInstance } from 'axios';

export interface WordPressConfig {
  url: string;
  username: string;
  password: string;
}

export class WordPressAPI {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(config: WordPressConfig) {
    this.baseURL = `${config.url}/wp-json/reviewflow/v1`;

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${config.username}:${config.password}`
        ).toString('base64')}`,
      },
      timeout: 30000,
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          throw new Error('Authentication failed. Check WordPress credentials.');
        }
        if (error.response?.status === 403) {
          throw new Error('Permission denied. Check user capabilities.');
        }
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw error;
      }
    );
  }

  // Dashboard endpoints
  async getDashboardStats() {
    const { data } = await this.client.get('/admin/dashboard/stats');
    return data;
  }

  async getRecentReviews(limit = 10) {
    const { data } = await this.client.get('/admin/reviews/recent', {
      params: { limit },
    });
    return data;
  }

  async getPendingReviews(page = 1, perPage = 20) {
    const { data } = await this.client.get('/admin/reviews/pending', {
      params: { page, per_page: perPage },
    });
    return data;
  }

  // Review management
  async approveReview(reviewId: number) {
    const { data } = await this.client.post(`/admin/reviews/${reviewId}/approve`);
    return data;
  }

  async rejectReview(reviewId: number) {
    const { data } = await this.client.post(`/admin/reviews/${reviewId}/reject`);
    return data;
  }

  async deleteReview(reviewId: number) {
    const { data } = await this.client.delete(`/admin/reviews/${reviewId}`);
    return data;
  }

  async bulkApprove(reviewIds: number[]) {
    const { data} = await this.client.post('/admin/reviews/bulk-approve', {
      review_ids: reviewIds,
    });
    return data;
  }

  // Analytics
  async getAnalytics(startDate: string, endDate: string) {
    const { data } = await this.client.get('/admin/analytics', {
      params: { start_date: startDate, end_date: endDate },
    });
    return data;
  }

  async getProductAnalytics(productId: number) {
    const { data } = await this.client.get(`/admin/analytics/product/${productId}`);
    return data;
  }

  // Security
  async getSecurityViolations(limit = 50) {
    const { data } = await this.client.get('/admin/security/violations', {
      params: { limit },
    });
    return data;
  }

  async getRateLimitStats() {
    const { data } = await this.client.get('/admin/security/rate-limits');
    return data;
  }

  // Settings
  async getSettings() {
    const { data } = await this.client.get('/admin/settings');
    return data;
  }

  async updateSettings(settings: Record<string, any>) {
    const { data } = await this.client.post('/admin/settings', settings);
    return data;
  }

  // Test connection
  async testConnection() {
    const { data } = await this.client.get('/admin/test');
    return data;
  }
}

// Singleton instance
let apiInstance: WordPressAPI | null = null;

export function getWordPressAPI(): WordPressAPI {
  if (!apiInstance) {
    const config = {
      url: process.env.WORDPRESS_URL || '',
      username: process.env.WORDPRESS_USERNAME || '',
      password: process.env.WORDPRESS_APP_PASSWORD || '',
    };

    if (!config.url || !config.username || !config.password) {
      throw new Error('WordPress credentials not configured. Check .env.local');
    }

    apiInstance = new WordPressAPI(config);
  }

  return apiInstance;
}
