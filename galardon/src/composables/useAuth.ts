import { ref } from "vue";
import { auth } from "@/services/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const user = ref(auth.currentUser);

onAuthStateChanged(auth, (u) => {
  user.value = u;
});

export function useAuth() {
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    user.value = auth.currentUser;
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
  };

  return {
    user,
    login,
    logout,
  };
}
