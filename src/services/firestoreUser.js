// firestoreUser.js
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
 * Firestoreのユーザードキュメントを更新します。
 * @param {Object} user - The user object containing uid and email.
 * @returns {Promise<void>}
 */
export const updateUserInFirestore = async (user) => {
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
};
