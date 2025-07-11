// @services/firestoreReactions.ts
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const getReactionsToCurrentUser = async (uid: string) => {
  const q = query(
    collection(db, 'reactions'),
    where('toUserId', '==', uid)
  );

  const snapshot = await getDocs(q);

  const reactions = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      uid: data.fromUserId,
      name: data.name,
      bio: data.bio || '',
      photoURL: data.photoURL || 'https://placehold.co/100x100?text=No+Image',
      type: data.type || 'like',
    };
  });

  return reactions;
};
