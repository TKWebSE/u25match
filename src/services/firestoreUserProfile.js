import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

/**
 * Firestoreに新しいユーザープロフィールを作成します。
 * @param {Object} user - Firebase Auth のユーザーオブジェクト（uidとemailを含む）
 * @returns {Promise<void>}
 */
export const createUserProfile = async (user) => {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
    });
    console.log('✅ Firestore ユーザープロフィール作成成功:', user.uid);
  } catch (error) {
    console.error('❌ Firestore プロフィール作成エラー:', error);
  }
};

/**
 * Firestoreのユーザープロフィールを更新または追加します。
 * 指定された追加データ（名前、自己紹介など）もマージされます。
 * @param {Object} user - Firebase Auth のユーザーオブジェクト（uidとemailを含む）
 * @param {Object} additionalData - マージして保存する追加のプロフィール情報（任意）
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (user, additionalData = {}) => {
  try {
    await setDoc(
      doc(db, 'users', user.uid),
      {
        email: user.email,
        updatedAt: new Date().toISOString(),
        ...additionalData,
      },
      { merge: true }
    );
    console.log('✅ Firestore ユーザープロフィール更新成功:', user.uid);
  } catch (error) {
    console.error('❌ Firestore プロフィール更新エラー:', error);
  }
};

/**
 * Firestoreからユーザープロフィールを取得します。
 * @param {string} uid - Firebase Auth の uid
 * @returns {Promise<Object|null>} ユーザーデータまたは null
 */
export const getUserProfile = async (uid) => {
  try {
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      console.log('📥 Firestore プロフィール取得成功:', uid);
      return snap.data();
    } else {
      console.log('⚠️ Firestore にプロフィールが存在しません:', uid);
      return null;
    }
  } catch (error) {
    console.error('❌ Firestore プロフィール取得エラー:', error);
    return null;
  }
};
