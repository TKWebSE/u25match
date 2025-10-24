// src/services/main/reactions/mock.ts
// 🎭 リアクションサービスのモック実装

import { mockFootprints } from '@mock/footprintsMock';
import { mockLikes } from '@mock/likesMock';
import { BaseService } from '../core/BaseService';
import { GetReactionsResponse, ReactionsService } from './types';

export class MockReactionsService extends BaseService implements ReactionsService {
  /**
   * 📋 リアクション履歴を取得（モック）
   * 受信したいいねと足跡の一覧を取得
   * 
   * @param userId 対象ユーザーID（自分のID）
   * @returns 受信したリアクション一覧（いいね・足跡）
   */
  async getReactions(userId: string): Promise<GetReactionsResponse> {
    await this.simulateNetworkDelay();

    return {
      reactions: {
        likes: mockLikes,
        footprints: mockFootprints,
      }
    };
  }
} 
