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
    const userReactions = mockReactions.filter(reaction => reaction.toUserId === userId);

    // いいねと足跡に分類
    const likes = userReactions
      .filter(reaction => reaction.type === 'like')
      .map(reaction => ({
        id: reaction.id,
        fromUserId: reaction.fromUserId,
        toUserId: reaction.toUserId,
        timestamp: new Date(reaction.timestamp),
      }));

    const footprints = userReactions
      .filter(reaction => reaction.type === 'footprint')
      .map(reaction => ({
        id: reaction.id,
        fromUserId: reaction.fromUserId,
        toUserId: reaction.toUserId,
        timestamp: new Date(reaction.timestamp),
      }));

    return {
      reactions: {
        likes,
        footprints,
      }
    };
  }
} 
