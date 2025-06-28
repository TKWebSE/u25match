import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

/**
 * サインアップ + Firestoreにプロフィール保存
 */
export const signUpWithProfile = async (email, password, name, age, gender) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email,
    name,
    age,
    gender,
    createdAt: serverTimestamp(),
  });

  return user;
};
/**
 * サインアップ
 */
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * サインイン
 */
export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * ログアウト
 */
export const logOut = () => {
  return signOut(auth);
};
