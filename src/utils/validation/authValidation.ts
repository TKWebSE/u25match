import { LoginFormData, SignUpFormData, ValidationResult } from './types';

/**
 * メールアドレスの形式をバリデーションする
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return {
      isValid: false,
      message: 'メールアドレスを入力してください',
    };
  }

  // シンプルなメールチェック
  if (!email.includes('@') || !email.includes('.')) {
    return {
      isValid: false,
      message: '有効なメールアドレスを入力してください',
    };
  }

  return { isValid: true };
};

/**
 * パスワードをバリデーションする
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return {
      isValid: false,
      message: 'パスワードを入力してください',
    };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      message: 'パスワードは6文字以上で入力してください',
    };
  }

  return { isValid: true };
};

/**
 * パスワード確認の一致をバリデーションする
 */
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return {
      isValid: false,
      message: 'パスワード（確認）を入力してください',
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: 'パスワードが一致しません',
    };
  }

  return { isValid: true };
};

/**
 * ログインフォームの全項目をバリデーションする
 */
export const validateLoginForm = (formData: LoginFormData): ValidationResult => {
  // メールアドレスのバリデーション
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  // パスワードのバリデーション
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  return { isValid: true };
};

/**
 * サインアップフォームの全項目をバリデーションする
 */
export const validateSignUpForm = (formData: SignUpFormData): ValidationResult => {
  // メールアドレスのバリデーション
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  // パスワードのバリデーション
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  // パスワード確認のバリデーション
  const confirmPasswordValidation = validatePasswordConfirmation(
    formData.password,
    formData.confirmPassword
  );
  if (!confirmPasswordValidation.isValid) {
    return confirmPasswordValidation;
  }

  return { isValid: true };
};
