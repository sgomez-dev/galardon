import { db } from "./firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import type { Guest } from "@/types/guest.type";

const guestsCol = collection(db, "guests");

export const getAllGuests = async (): Promise<Guest[]> => {
  const snapshot = await getDocs(guestsCol);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Guest));
};

export const getGuestBySlug = async (slug: string): Promise<Guest | null> => {
  const q = query(guestsCol, where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc: any = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Guest;
};

export const addGuest = async (guest: Omit<Guest, "id">): Promise<void> => {
  await addDoc(guestsCol, guest);
};
