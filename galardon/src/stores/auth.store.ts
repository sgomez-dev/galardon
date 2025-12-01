import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const loginWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  await signOut(auth);
};
