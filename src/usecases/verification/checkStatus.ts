// src/usecases/verification/checkStatus.ts
// 本人確認ステータス確認のユースケース - 審査状況・書類ステータス取得を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { VerificationStatus, verificationStore } from '@stores/verificationStore';

/**
 * ステータス確認処理の結果
 */
export interface CheckStatusResult {
  success: boolean;                    // 確認成功フラグ
  status?: VerificationStatus;         // 現在のステータス（成功時）
  lastUpdated?: Date;                  // 最終更新日時（成功時）
  error?: string;                      // エラーメッセージ（失敗時のみ）
}

/**
 * 本人確認のステータスを確認するユースケース
 * 
 * フロー:
 * 1. ローディング開始・エラークリア
 * 2. サービス層でステータス取得
 * 3. 書類一覧・審査履歴も同時取得
 * 4. ストア状態を最新情報に更新
 * 5. ステータス変更時の通知処理
 * 6. 結果をUIに返却
 * 
 * @returns ステータス確認結果（成功/失敗・ステータス・エラー）
 */
export const checkStatus = async (): Promise<CheckStatusResult> => {
  try {
    // ローディング開始・エラークリア
    verificationStore.getState().setLoading(true);
    verificationStore.getState().clearError();

    // サービス層でステータス取得
    const result = await serviceRegistry.verification.getStatus();

    // ストア状態を最新情報に更新
    const currentStatus = verificationStore.getState().status;

    // ステータス更新
    verificationStore.getState().setStatus(result.status);

    // 書類一覧更新
    if (result.documents) {
      verificationStore.getState().setDocuments(result.documents);
    }

    // 審査履歴更新
    if (result.reviewHistory) {
      verificationStore.getState().setReviewHistory(result.reviewHistory);
    }

    // ステータス変更時の通知処理
    if (currentStatus !== result.status) {
      verificationStore.getState().addReviewHistory({
        id: `status_change_${Date.now()}`,
        action: 'status_changed',
        oldStatus: currentStatus,
        newStatus: result.status,
        timestamp: new Date(),
        message: getStatusChangeMessage(currentStatus, result.status),
      });
    }

    verificationStore.getState().setLoading(false);

    return {
      success: true,
      status: result.status,
      lastUpdated: result.lastUpdated
    };

  } catch (error: any) {
    console.error('ステータス確認エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    verificationStore.getState().setLoading(false);
    verificationStore.getState().setError(error.message || 'ステータスの確認に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'ステータスの確認に失敗しました'
    };
  }
};

/**
 * ステータス変更メッセージを生成する
 */
function getStatusChangeMessage(oldStatus: VerificationStatus, newStatus: VerificationStatus): string {
  switch (newStatus) {
    case 'approved':
      return '本人確認が承認されました';
    case 'rejected':
      return '本人確認が拒否されました。書類を再提出してください';
    case 'under_review':
      return '審査を開始しました。結果をお待ちください';
    case 'expired':
      return '本人確認の有効期限が切れました。再度手続きを行ってください';
    default:
      return `ステータスが${oldStatus}から${newStatus}に変更されました`;
  }
}
