/**
 * メールアドレスの形式をバリデーションする
 * @param email メールアドレス
 * @throws Error バリデーションに失敗した場合
 */
export const validateEmailFormat = (email: string): void => {
  if (!email) {
    throw new Error('メールアドレスを入力してください');
  }
  if (!email.includes('@') || !email.includes('.')) {
    throw new Error('有効なメールアドレスを入力してください');
  }
};

/**
 * パスワードの長さをバリデーションする
 * @param password パスワード
 * @throws Error バリデーションに失敗した場合
 */
export const validatePasswordLength = (password: string): void => {
  if (!password) {
    throw new Error('パスワードを入力してください');
  }
  if (password.length < 6 || password.length > 32) {
    throw new Error('パスワードは6-32文字で入力してください');
  }
};

/**
 * パスワードに空白文字が含まれていないかチェック
 * @param password パスワード
 * @throws Error バリデーションに失敗した場合
 */
export const validatePasswordNoSpaces = (password: string): void => {
  if (!password) {
    throw new Error('パスワードを入力してください');
  }
  if (password.includes(' ')) {
    throw new Error('パスワードに空白文字は使用できません');
  }
};

/**
 * パスワードの文字種をバリデーションする
 * @param password パスワード
 * @throws Error バリデーションに失敗した場合
 */
export const validatePasswordCharacterTypes = (password: string): void => {
  if (!password) {
    throw new Error('パスワードを入力してください');
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  if (!hasLetter || !hasNumber) {
    throw new Error('パスワードは英字と数字を組み合わせて入力してください');
  }
};

/**
 * パスワードの一致をチェックする
 * @param password パスワード
 * @param confirmPassword 確認パスワード
 * @throws Error バリデーションに失敗した場合
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): void => {
  if (!confirmPassword) {
    throw new Error('パスワード（確認）を入力してください');
  }
  if (password !== confirmPassword) {
    throw new Error('パスワードが一致しません');
  }
};
