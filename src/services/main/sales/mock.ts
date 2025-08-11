// src/services/sales/mock.ts
// 🎭 セールサービスのモック実装

import { BaseService } from '../../base/BaseService';
import { SaleItem, SalesResponse, SalesService, SalesStats } from './types';

// モックセールデータ
const mockSales: SaleItem[] = [
  {
    id: '1',
    title: 'スタートダッシュキャンペーン',
    description: 'アプリのスタートダッシュ応援！初月50%OFF',
    discount: '50%OFF',
    endDate: '2024-04-30',
    backgroundColor: '#ff6b35',
    textColor: '#ffffff',
    originalPrice: '¥2,980',
    salePrice: '¥1,490',
    features: ['✨ プレミアムマッチング', '💬 無制限メッセージ', '👀 プロフィール閲覧', '🎯 高精度マッチング'],
    urgency: '🔥 限定100名様',
    details: 'アプリのスタートダッシュを応援する特別キャンペーンです。プレミアムマッチング機能、メッセージ機能、プロフィール閲覧機能がすべて50%OFFでご利用いただけます。',
    terms: [
      '期間限定：ユーザー登録から一週間',
      '対象機能：プレミアムマッチング、メッセージ、プロフィール閲覧',
      '支払い方法：クレジットカード、デビットカード',
      'キャンセル：いつでも可能',
    ],
  },
  {
    id: '2',
    title: '夏のビーチセール',
    description: '夏限定！3ヶ月プランが40%OFF',
    discount: '40%OFF',
    endDate: '2024-08-31',
    backgroundColor: '#00b4d8',
    textColor: '#ffffff',
    originalPrice: '¥8,940',
    salePrice: '¥5,364',
    features: ['🏖️ 夏限定特典', '💕 3ヶ月間サポート', '🎉 特別イベント参加', '🌟 優先マッチング'],
    urgency: '⏰ 残り30日',
    details: '夏のビーチシーズン限定の特別セールです。3ヶ月プランが40%OFFでご利用いただけます。夏の出会いを応援します！',
    terms: [
      '期間：2025年6月1日〜8月31日',
      '対象：3ヶ月プランのみ',
      '割引率：40%OFF',
      '支払い：一括払い',
    ],
  },
  {
    id: '3',
    title: '夏休み特別プラン',
    description: '学生限定！夏休み期間無料体験',
    discount: '夏休み無料',
    endDate: '2024-09-15',
    backgroundColor: '#ff9e00',
    textColor: '#ffffff',
    originalPrice: '¥5,960',
    salePrice: '¥0',
    features: ['🎓 学生限定', '☀️ 夏休み期間無料', '🚀 全機能体験', '💎 プレミアム特典'],
    urgency: '🎯 学生証確認必須',
    details: '学生限定の夏休み特別プランです。夏休み期間中（約2ヶ月間）すべてのプレミアム機能を無料でお試しいただけます。',
    terms: [
      '対象：学生ユーザーのみ',
      '期間：夏休み期間（約2ヶ月間）',
      '自動更新：夏休み終了後に自動で有料プランに移行',
      'キャンセル：いつでも可能',
    ],
  },
];

export class MockSalesService extends BaseService implements SalesService {
  private useMock: boolean = true;  // モックモードのフラグ

  /**
   * 🔄 モックモードを切り替え
   * 開発時はモックデータ、本番時は実際のAPIを使用
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
   * 🛍️ すべてのセール情報を取得（モック）
   */
  async getAllSales(): Promise<SalesResponse> {
    try {
      await this.simulateApiCall();
      return this.createSuccessResponse(mockSales);
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  /**
   * 🔍 特定のセール情報を取得（モック）
   */
  async getSaleById(id: string): Promise<SaleItem | null> {
    try {
      await this.simulateApiCall();
      const sale = mockSales.find(s => s.id === id);
      return sale || null;
    } catch (error) {
      console.error('Error fetching sale by ID:', error);
      return null;
    }
  }

  /**
   * ⏰ アクティブなセールのみを取得（モック）
   */
  async getActiveSales(): Promise<SalesResponse> {
    try {
      await this.simulateApiCall();
      const now = new Date();
      const activeSales = mockSales.filter(sale => {
        const endDate = new Date(sale.endDate);
        return endDate > now;
      });
      return this.createSuccessResponse(activeSales);
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  /**
   * 🔎 セール情報を検索（モック）
   */
  async searchSales(query: string): Promise<SalesResponse> {
    try {
      await this.simulateApiCall();
      const searchResults = mockSales.filter(sale =>
        sale.title.toLowerCase().includes(query.toLowerCase()) ||
        sale.description.toLowerCase().includes(query.toLowerCase()) ||
        sale.features?.some(feature =>
          feature.toLowerCase().includes(query.toLowerCase())
        )
      );
      return this.createSuccessResponse(searchResults);
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  /**
   * 📂 セール情報をカテゴリ別に取得（モック）
   */
  async getSalesByCategory(category: string): Promise<SalesResponse> {
    try {
      await this.simulateApiCall();
      let filteredSales = mockSales;

      switch (category.toLowerCase()) {
        case 'new':
          filteredSales = mockSales.filter(sale => sale.id === '1');
          break;
        case 'seasonal':
          filteredSales = mockSales.filter(sale => sale.id === '2');
          break;
        case 'student':
          filteredSales = mockSales.filter(sale => sale.id === '3');
          break;
        default:
          filteredSales = mockSales;
      }

      return this.createSuccessResponse(filteredSales);
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  /**
   * 📊 セール情報の統計を取得（モック）
   */
  async getSalesStats(): Promise<SalesStats> {
    try {
      await this.simulateApiCall();
      const now = new Date();
      const activeSales = mockSales.filter(sale => {
        const endDate = new Date(sale.endDate);
        return endDate > now;
      });

      const totalDiscount = mockSales.reduce((total, sale) => {
        if (sale.originalPrice && sale.salePrice) {
          const original = parseInt(sale.originalPrice.replace(/[^\d]/g, ''));
          const salePrice = parseInt(sale.salePrice.replace(/[^\d]/g, ''));
          if (!isNaN(original) && !isNaN(salePrice)) {
            return total + (original - salePrice);
          }
        }
        return total;
      }, 0);

      return {
        totalSales: mockSales.length,
        activeSales: activeSales.length,
        totalDiscount,
        averageDiscount: totalDiscount / mockSales.length,
      };
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

  /**
   * APIコールをシミュレート（実際の実装では削除）
   */
  private async simulateApiCall(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 100));
  }
}
