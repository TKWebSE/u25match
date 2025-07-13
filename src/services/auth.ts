// services/auth.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const signUp = (email: string, password: string) => {
  console.log('Signing up with email:', email);
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result; // 必要に応じて result.user とか返す
  } catch (error) {
    throw error; // 上に投げる
  }
};

export const logOut = () => {
  return signOut(auth);
};
