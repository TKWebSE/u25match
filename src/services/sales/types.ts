// src/services/sales/types.ts
// 🎯 セールサービスの型定義 - 契約書

export interface SaleItem {
  id: string;
  title: string;
  description: string;
  discount: string;
  endDate: string;
  backgroundColor: string;
  textColor: string;
  originalPrice: string;
  salePrice: string;
  features: string[];
  urgency: string;
  details: string;
  terms: string[];
}

export interface SalesResponse {
  success: boolean;
  data?: SaleItem[];
  error?: string;
}

export interface SalesStats {
  totalSales: number;
  activeSales: number;
  totalDiscount: number;
  averageDiscount: number;
}

/**
 * 🎯 セールサービスのインターフェース
 * どんな実装も必ずこの機能を提供する約束
 */
export interface SalesService {
  // モックモードの切り替え
  setMockMode(enabled: boolean): void;

  // 現在のモードを確認
  isMockMode(): boolean;

  // すべてのセール情報を取得
  getAllSales(): Promise<SalesResponse>;

  // 特定のセール情報を取得
  getSaleById(id: string): Promise<SaleItem | null>;

  // アクティブなセールのみを取得
  getActiveSales(): Promise<SalesResponse>;

  // セール情報を検索
  searchSales(query: string): Promise<SalesResponse>;

  // セール情報をカテゴリ別に取得
  getSalesByCategory(category: string): Promise<SalesResponse>;

  // セール情報の統計を取得
  getSalesStats(): Promise<SalesStats>;
}
