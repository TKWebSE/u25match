// src/services/auth/mock.ts
// 🎭 モック用認証サービス - バックエンドに接続しない

import { myProfileMock } from '@mock/myProfileMock';
import { AuthUser } from '@my-types/user';
import { AuthResult, AuthService } from './types';

export class MockAuthService implements AuthService {
  // 🎯 同じインターフェースの約束を守って実装（でも中身はダミー）
  private currentUser: AuthUser | null = null;
  private callbacks: ((user: AuthUser | null) => void)[] = [];

  async signUp(email: string, password: string): Promise<AuthResult> {
    console.log('🎭 モックサインアップ:', email);

    // APIコールをシミュレート（実際は何もしない）
    await this.simulateApiCall(500);

    // バリデーション例
    if (!email || !password) {
      throw new Error('メールアドレスとパスワードは必須です');
    }

    if (password.length < 6) {
      throw new Error('パスワードは6文字以上で入力してください');
    }

    // ダミーユーザーを返す
    return this.createMockResult();
  }

  async logIn(email: string, password: string): Promise<AuthResult> {
    console.log('🎭 モックログイン:', email);

    try {
      // APIコールをシミュレート
      await this.simulateApiCall(800);

      // エラーテスト用
      if (email === 'error@test.com') {
        throw new Error('ログインできませんでした');
      }

      // ダミーユーザーを返す
      return this.createMockResult();
    } catch (error) {
      throw new Error("ログインできませんでした");
    }
  }

  async logOut(): Promise<void> {
    console.log('🎭 モックログアウト');

    // APIコールをシミュレート
    await this.simulateApiCall(300);

    // 何もしない（実際は状態をクリア）
  }

  async resetPassword(email: string): Promise<void> {
    console.log('🎭 モックパスワードリセット:', email);

    // APIコールをシミュレート
    await this.simulateApiCall(800);

    // バリデーション例
    if (!email) {
      throw new Error('メールアドレスは必須です');
    }

    console.log('🎭 パスワードリセットメールを送信しました（モック）');
  }

  async deleteAccount(): Promise<void> {
    console.log('🎭 モックアカウント削除');

    // APIコールをシミュレート
    await this.simulateApiCall(2000);

    if (!this.currentUser) {
      throw new Error('ログインしていません');
    }

    // ユーザー情報をクリア
    this.currentUser = null;
    this.notifyCallbacks(null);

    console.log('🎭 アカウント削除完了（モック）');
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    console.log('🎭 モック認証状態監視を開始');

    // コールバックを登録
    this.callbacks.push(callback);

    // モックユーザーを即座に通知
    setTimeout(() => {
      const mockUser: AuthUser = {
        uid: myProfileMock.uid,
        email: 'tanaka.hanako@example.com', // myProfileMockに合わせたメール
        displayName: myProfileMock.name,
        image: myProfileMock.images[0] || null,
      };

      this.currentUser = mockUser;
      callback(mockUser);
    }, 100);

    // unsubscribe関数を返す
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  // 🛠️ プライベートヘルパーメソッド

  private async simulateApiCall(delay: number): Promise<void> {
    // 実際のAPIコールのような待機時間をシミュレート
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  private createMockResult(): AuthResult {
    // 同じ形のダミーデータを返す
    return {
      user: {
        uid: 'mock-user-123',
        email: 'test@example.com',
        displayName: 'テストユーザー',
        image: undefined,
        emailVerified: true,
      },
      operationType: 'signIn',
      providerId: null,
    };
  }
}
