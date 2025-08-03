// src/services/main/reactions/mock.ts
// 🎭 リアクションサービスのモック実装

import { mockReactions } from '../../../mock/reactionsMock';
import { ReactionsResponse, ReactionsService } from './types';

export class MockReactionsService implements ReactionsService {
  /**
   * ❤️ リアクションを送信（モック）
   * @param targetUserId 対象ユーザーID
   * @returns 送信結果
   */
  async sendReaction(targetUserId: string): Promise<ReactionsResponse> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        id: `reaction_${Date.now()}`,
        fromUserId: 'current_user',
        toUserId: targetUserId,
        type: 'like',
        timestamp: new Date(),
      },
    };
  }

  /**
   * ⭐ スーパーライクを送信（モック）
   * @param targetUserId 対象ユーザーID
   * @returns 送信結果
   */
  async sendSuperLike(targetUserId: string): Promise<ReactionsResponse> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        id: `reaction_${Date.now()}`,
        fromUserId: 'current_user',
        toUserId: targetUserId,
        type: 'super_like',
        timestamp: new Date(),
        message: 'あなたが気になります！',
      },
    };
  }

  /**
   * 📋 リアクション履歴を取得（モック）
   * @param userId ユーザーID
   * @returns リアクション履歴
   */
  async getReactions(userId: string): Promise<ReactionsResponse> {
    await this.simulateNetworkDelay();
    // モックデータから該当ユーザーへのリアクションを取得
    const userReactions = mockReactions.filter(reaction => reaction.toUserId === userId);
    return {
      success: true,
      data: userReactions,
    };
  }

  /**
   * ⏱️ ネットワーク遅延をシミュレート
   */
  private async simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, Math.random() * 1000 + 500);
    });
  }
} 
