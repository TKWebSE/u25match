// src/services/main/chat/factory.ts
// 🏭 チャットサービス工場 - 環境判定と生成の責任のみ

import { getServiceConfigInfo, getServiceMode } from '@utils/serviceConfig';
import { MockChatService } from './mock';
import { ProdChatService } from './prod';
import { ChatService } from './types';

export class ChatServiceFactory {
  /**
   * 🎯 環境に応じて適切なチャットサービスを生成
   * この関数の責任：
   * 1. 環境変数の判定
   * 2. 適切な実装クラスの選択
   * 3. インスタンスの生成
   */
  static createChatService(): ChatService {
    const mode = getServiceMode('CHAT');
    const configInfo = getServiceConfigInfo('CHAT');

    console.log('🔧 チャットサービス生成中...');
    console.log('📋 チャットサービス設定:', configInfo);

    if (mode === 'firebase') {
      console.log('🔥 Firebaseチャットサービスを生成');
      return new ProdChatService();
    } else {
      console.log('🎭 モックチャットサービスを生成');
      return new MockChatService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createChatService(): ChatService {
  return ChatServiceFactory.createChatService();
} 
