import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Firebase初期化ファイルのパスに合わせて調整してください

/**
 * チャットをFirestoreに追加します。
 * @param {string} chatRoomId - チャットルームのID
 * @param {Object} chat - チャット情報（送信者ID、本文など）
 * @returns {Promise<string>} 追加したドキュメントのID
 */
export async function sendChat(chatRoomId: string, chat: { senderId: string; text: string }) {
  try {
    const messagesRef = collection(db, 'chatRooms', chatRoomId, 'messages');
    const docRef = await addDoc(messagesRef, {
      senderId: chat.senderId,
      text: chat.text,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('❌ チャット送信エラー:', error);
    throw error;
  }
}

/**
 * チャットルームのチャットを取得します（最新順に並べ替え）。
 * @param {string} chatRoomId - チャットルームのID
 * @returns {Promise<Array>} チャット一覧
 */
export async function getChats(chatRoomId: string) {
  try {
    const messagesRef = collection(db, 'chatRooms', chatRoomId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    const snapshot = await getDocs(q);
    const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return chats;
  } catch (error) {
    console.error('❌ チャット取得エラー:', error);
    return [];
  }
}

/**
 * リアルタイムでチャットを監視し、更新がある度にコールバックを呼び出す。
 * @param {string} chatRoomId - チャットルームのID
 * @param {(chats: Array) => void} callback - チャット更新時に呼ばれるコールバック関数
 * @returns {() => void} 監視解除関数
 */
export function subscribeChats(chatRoomId: string, callback: (chats: any[]) => void) {
  const messagesRef = collection(db, 'chatRooms', chatRoomId, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(chats);
  }, (error) => {
    console.error('❌ チャット監視エラー:', error);
  });

  return unsubscribe;
}

import { where } from 'firebase/firestore';

/**
 * 指定ユーザーが参加しているチャットルームの一覧を取得します。
 * チャットルームには参加者のUIDが配列で stored されている想定です。
 * @param {string} userId - 対象ユーザーのUID
 * @returns {Promise<Array>} チャットルーム一覧データ
 */
export async function getChatList(userId: string) {
  try {
    const chatRoomsRef = collection(db, 'chatRooms');
    // userId が participants 配列に含まれているチャットルームを取得
    const q = query(
      chatRoomsRef,
      where('participants', 'array-contains', userId),
      orderBy('updatedAt', 'desc') // 最新の更新日時順に並べる
    );
    const snapshot = await getDocs(q);

    // チャットルームの情報を配列にまとめる
    const chatList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return chatList;
  } catch (error) {
    console.error('❌ チャットルーム一覧取得エラー:', error);
    return [];
  }
}
