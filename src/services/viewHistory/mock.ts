// src/services/viewHistory/mock.ts
import { ViewHistoryService, ViewedProfile } from './types';

export class MockViewHistoryService implements ViewHistoryService {
  async saveBatch(views: ViewedProfile[]): Promise<void> {
    console.log(`[Mock] 閲覧履歴を保存:`, views);
  }
}

