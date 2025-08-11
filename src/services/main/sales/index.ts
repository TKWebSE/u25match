// src/services/sales/index.ts
// 🚀 セールサービスのエントリーポイント

export { createSalesService, SalesServiceFactory } from './factory';
export { MockSalesService } from './mock';
export { ProdSalesService } from './prod';
export type { SaleItem, SalesResponse, SalesService, SalesStats } from './types';


