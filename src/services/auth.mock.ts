// services/auth.mock.ts - 画面テスト用のモック認証サービス

// モック用のダミーユーザー情報
const mockUser = {
  uid: 'mock-user-123',
  email: 'test@example.com',
  displayName: 'テストユーザー',
  photoURL: null,
  emailVerified: true,
};

// モック認証結果
const mockAuthResult = {
  user: mockUser,
  operationType: 'signIn',
  providerId: null,
};

export const signUp = async (email: string, password: string) => {
  console.log('🎭 モックサインアップ:', email);
  
  // 実際のAPIコールをシミュレートするため少し待機
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // バリデーション例
  if (!email || !password) {
    throw new Error('メールアドレスとパスワードは必須です');
  }
  
  if (password.length < 6) {
    throw new Error('パスワードは6文字以上で入力してください');
  }
  
  return mockAuthResult;
};

export const logIn = async (email: string, password: string) => {
  console.log('🎭 モックログイン:', email);
  
  try {
    // 実際のAPIコールをシミュレートするため少し待機
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 簡単なバリデーション例
    if (email === 'error@test.com') {
      throw new Error('ログインできませんでした');
    }
    
    return mockAuthResult;
  } catch (error) {
    throw new Error("ログインできませんでした");
  }
};

export const logOut = async () => {
  console.log('🎭 モックログアウト');
  
  // 実際のAPIコールをシミュレートするため少し待機
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return Promise.resolve();
};