// services/firestoreUserProfile.ts
import { collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

/**
 * Firestoreに新しいユーザープロフィールを作成します。
 * @param {Object} user - Firebase Auth のユーザーオブジェクト（uidとemailを含む）
 * @returns {Promise<void>}
 */
export const createUserProfile = async (uid: string, email: string) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      email: email,
      createdAt: new Date().toISOString(),
    });
    console.log('✅ Firestore ユーザープロフィール作成成功:', uid);
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
export const updateUserProfile = async (user: { uid: string; email: string }, additionalData: { [key: string]: any } = {}) => {
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
export const getUserProfile = async (uid: string) => {
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

// ユーザープロフィールの型を定義
export type UserProfileSummary = {
  uid: string;
  name: string;
  bio: string;
  photoURL: string;
};
/**
 * Firestoreから全ユーザープロフィールのサマリーを取得します。
 * @param {string|null} currentUid - 現在のユーザーのuid（自分自身は除外するため）
 * @returns {Promise<UserProfileSummary[]>} ユーザープロフィールのサマリー一覧
 */
export async function getUsersList(currentUid = null) {
  try {
    const usersRef = collection(db, 'users');
    let q = query(usersRef);
    const snapshot = await getDocs(q);


    const userList: UserProfileSummary[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!currentUid || doc.id !== currentUid) {
        userList.push({
          uid: doc.id,
          name: data.name || '名無し',
          bio: data.bio || '',
          photoURL: data.photoURL || 'https://placehold.co/100x100?text=No+Image',
        });
      }
    });

    return userList;
  } catch (error) {
    console.error('ユーザー一覧の取得に失敗しました:', error);
    return [];
  }
}
