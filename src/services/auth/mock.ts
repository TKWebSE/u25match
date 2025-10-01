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

    // APIコールをシミュレート（実際は何もしない）
    await this.simulateApiCall(500);

    // ダミーユーザーを作成して返す
    const authUser = this.createMockAuthUser();
    return {
      user: {
        uid: authUser.uid,
        email: authUser.email || '',
        displayName: authUser.displayName || undefined,
        image: authUser.image || undefined,
        emailVerified: true,
      },
      operationType: 'signUp',
      providerId: null,
    };
  }

  async logIn(email: string, password: string): Promise<AuthResult> {
    try {
      // APIコールをシミュレート
      await this.simulateApiCall(800);

      // エラーテスト用
      if (email === 'error@test.com') {
        throw new Error('ログインできませんでした');
      }

      // ダミーユーザーを作成して返す
      const authUser = this.createMockAuthUser();
      return {
        user: {
          uid: authUser.uid,
          email: authUser.email || '',
          displayName: authUser.displayName || undefined,
          image: authUser.image || undefined,
          emailVerified: true,
        },
        operationType: 'signIn',
        providerId: null,
      };
    } catch (error) {
      throw new Error("ログインできませんでした");
    }
  }

  async logOut(): Promise<void> {
    try {
      // APIコールをシミュレート
      await this.simulateApiCall(300);

      // 何もしない（実際は状態をクリア）
    } catch (error: any) {
      throw new Error('ログアウトに失敗しました');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      // APIコールをシミュレート
      await this.simulateApiCall(800);

    } catch (error: any) {
      throw new Error('パスワードリセットメールの送信に失敗しました');
    }
  }

  async reauthenticate(password: string): Promise<void> {
    // APIコールをシミュレート
    await this.simulateApiCall(500);

    if (!this.currentUser) {
      throw new Error('ログインしていません');
    }

    // モック用のパスワードチェック（実際のアプリでは適切なパスワードを設定）
    if (password !== 'password123') {
      throw new Error('パスワードが正しくありません');
    }
  }

  async updatePassword(oobCode: string, newPassword: string): Promise<void> {
    // APIコールをシミュレート
    await this.simulateApiCall(1000);

    // モック用のoobCodeチェック
    if (!oobCode || oobCode.length < 10) {
      throw new Error('無効なリセットコードです。再度パスワードリセットを実行してください');
    }

    // モック用のパスワード強度チェック
    if (newPassword.length < 6) {
      throw new Error('パスワードが弱すぎます');
    }
  }

  async deleteAccount(): Promise<void> {
    // APIコールをシミュレート
    await this.simulateApiCall(2000);

    if (!this.currentUser) {
      throw new Error('ログインしていません');
    }

    // ユーザー情報をクリア
    this.currentUser = null;
    this.notifyCallbacks(null);
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    // コールバックを登録
    this.callbacks.push(callback);

    // モックユーザーを即座に通知
    setTimeout(() => {
      const mockUser = this.createMockAuthUser();

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

  private createMockAuthUser(): AuthUser {
    // myProfileMockと一貫性のあるモックユーザーを作成
    return {
      uid: myProfileMock.uid,
      email: 'tanaka.hanako@example.com',
      displayName: myProfileMock.name,
      image: myProfileMock.images[0] || null,
    };
  }

  private async simulateApiCall(delay: number): Promise<void> {
    // 実際のAPIコールのような待機時間をシミュレート
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  private notifyCallbacks(user: AuthUser | null): void {
    this.callbacks.forEach(callback => callback(user));
  }

}
