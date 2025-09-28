// src/services/main/reactions/prod.ts
// 🌐 リアクションサービスの本番実装

import { ReactionsResponse, ReactionsService } from './types';

export class ProdReactionsService implements ReactionsService {
  /**
   * ❤️ リアクションを送信（本番）
   * @param targetUserId 対象ユーザーID
   * @returns 送信結果
   */
  async sendReaction(targetUserId: string): Promise<ReactionsResponse> {
    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId,
          type: 'like',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send reaction: ${response.statusText}`);
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
   * ⭐ スーパーライクを送信（本番）
   * @param targetUserId 対象ユーザーID
   * @returns 送信結果
   */
  async sendSuperLike(targetUserId: string): Promise<ReactionsResponse> {
    try {
      const response = await fetch('/api/reactions/super-like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId,
          type: 'super_like',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send super like: ${response.statusText}`);
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
   * 👣 足あとを残す（本番）
   * @param targetUserId 対象ユーザーID
   * @returns 送信結果
   */
  async leaveFootprint(targetUserId: string): Promise<ReactionsResponse> {
    try {
      const response = await fetch('/api/reactions/footprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId,
          type: 'footprint',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to leave footprint: ${response.statusText}`);
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
   * 📋 リアクション履歴を取得（本番）
   * @param userId ユーザーID
   * @returns リアクション履歴
   */
  async getReactions(userId: string): Promise<ReactionsResponse> {
    try {
      const response = await fetch(`/api/reactions/${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to get reactions: ${response.statusText}`);
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
} 
