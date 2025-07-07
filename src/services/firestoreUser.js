// service/firestoreUser.js
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

/**
 * Firestoreに新しいユーザードキュメントを作成します。
 * @param {Object} user - The user object containing uid and email.
 * @returns {Promise<void>}
 */
export const createUserInFirestore = async (user) => {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
    });
    console.log("ユーザーデータFirestoreに保存成功", user.uid);
  } catch (error) {
    console.error("Firestore保存エラー:", error);
  }
};

/**
 * Firestoreのユーザードキュメントを更新または追加します。
 * 指定された追加データ（名前、自己紹介など）もマージされます。
 *
 * @param {Object} user - Firebase Auth のユーザーオブジェクト（uidとemailを含む）
 * @param {Object} additionalData - マージして保存する追加のプロフィール情報（任意）
 * @returns {Promise<void>}
 */
export const updateUserInFirestore = async (user, additionalData = {}) => {
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
    console.log("Firestoreユーザー更新成功", user.uid);
  } catch (error) {
    console.error("Firestore更新エラー:", error);
  }
};
