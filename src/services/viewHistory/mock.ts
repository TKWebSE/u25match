// src/services/viewHistory/mock.ts
import { ViewHistoryCache, ViewHistoryService } from './types';

export class MockViewHistoryService implements ViewHistoryService {
  async saveBatch(views: ViewHistoryCache[]): Promise<void> {
    console.log(`[Mock] 閲覧履歴を保存:`, views);
  }
}

