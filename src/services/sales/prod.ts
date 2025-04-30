// src/services/sales/prod.ts
// 🌐 セールサービスの本番実装

import { SaleItem, SalesResponse, SalesService, SalesStats } from './types';

export class ProdSalesService implements SalesService {
  private useMock: boolean = false;  // 本番モードのフラグ

  /**
   * 🔄 モックモードを切り替え
   * 本番環境では常にfalse
   * @param enabled true: モックモード、false: 本番モード
   */
  setMockMode(enabled: boolean): void {
    this.useMock = enabled;
  }

  /**
   * 🔍 現在のモードを確認
   * @returns true: モックモード、false: 本番モード
   */
  isMockMode(): boolean {
    return this.useMock;
  }

  /**
   * 🛍️ すべてのセール情報を取得（本番）
   */
  async getAllSales(): Promise<SalesResponse> {
    try {
      const response = await fetch('/api/sales');

      if (!response.ok) {
        throw new Error(`Failed to fetch sales: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 🔍 特定のセール情報を取得（本番）
   */
  async getSaleById(id: string): Promise<SaleItem | null> {
    try {
      const response = await fetch(`/api/sales/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch sale: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching sale by ID:', error);
      return null;
    }
  }

  /**
   * ⏰ アクティブなセールのみを取得（本番）
   */
  async getActiveSales(): Promise<SalesResponse> {
    try {
      const response = await fetch('/api/sales/active');

      if (!response.ok) {
        throw new Error(`Failed to fetch active sales: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 🔎 セール情報を検索（本番）
   */
  async searchSales(query: string): Promise<SalesResponse> {
    try {
      const response = await fetch(`/api/sales/search?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`Failed to search sales: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 📂 セール情報をカテゴリ別に取得（本番）
   */
  async getSalesByCategory(category: string): Promise<SalesResponse> {
    try {
      const response = await fetch(`/api/sales/category/${encodeURIComponent(category)}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch sales by category: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 📊 セール情報の統計を取得（本番）
   */
  async getSalesStats(): Promise<SalesStats> {
    try {
      const response = await fetch('/api/sales/stats');

      if (!response.ok) {
        throw new Error(`Failed to fetch sales stats: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching sales stats:', error);
      return {
        totalSales: 0,
        activeSales: 0,
        totalDiscount: 0,
        averageDiscount: 0,
      };
    }
  }
}
