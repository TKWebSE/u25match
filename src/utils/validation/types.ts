// バリデーション結果の型定義
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// ログインフォームのデータ型
export interface LoginFormData {
  email: string;
  password: string;
}

// サインアップフォームのデータ型
export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}
