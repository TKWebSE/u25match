// src/services/main/reactions/mock.ts
// 🎭 リアクションサービスのモック実装

import { mockReactions } from '@mock/reactionsMock';
import { BaseService } from '../core/BaseService';
import { GetReactionsResponse, ReactionsResponse, ReactionsService } from './types';

export class MockReactionsService extends BaseService implements ReactionsService {
  /**
   * 👣 足あとを残す（モック）
   * @param targetUserId 対象ユーザーID
   * @returns 送信結果
   */
  async leaveFootprint(targetUserId: string): Promise<ReactionsResponse> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        id: `footprint_${Date.now()}`,
        viewerId: 'current_user',
        viewedUserId: targetUserId,
        viewedAt: new Date(),
      },
    };
  }

  /**
   * 📋 リアクション履歴を取得（モック）
   * 受信したいいねと足跡の一覧を取得
   * 
   * @param userId 対象ユーザーID（自分のID）
   * @returns 受信したリアクション一覧（いいね・足跡）
   */
  async getReactions(userId: string): Promise<GetReactionsResponse> {
    await this.simulateNetworkDelay();

    // モックデータからこのユーザーが受信したリアクションを抽出
    // toUserId が自分のIDのもの = 自分が受け取ったリアクション
    const receivedReactions = mockReactions
      .filter(reaction => reaction.toUserId === userId)
      .map(reaction => ({
        id: reaction.id,
        fromUserId: reaction.fromUserId,
        toUserId: reaction.toUserId,
        type: reaction.type,
        timestamp: new Date(reaction.timestamp),
      }));

    return {
      received: receivedReactions,
    };
  }
} 
