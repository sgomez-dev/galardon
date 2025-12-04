import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
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

export const getGuestByName = async (name: string): Promise<Guest | null> => {
  const q = query(guestsCol, where("name", "==", name));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc: any = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Guest;
};

export const addGuest = async (guest: Omit<Guest, "id">): Promise<void> => {
  try {
    await addDoc(guestsCol, guest);
    console.log("✅ Invitado creado exitosamente:", guest.name);
  } catch (error: any) {
    console.error("❌ Error al crear invitado:", error);
    throw new Error(`Error al crear invitado: ${error.message || error}`);
  }
};

export const updateGuest = async (
  guestId: string,
  data: Partial<Guest>
): Promise<void> => {
  const guestDoc = doc(db, "guests", guestId);
  await updateDoc(guestDoc, data);
};

export const deleteGuest = async (guestId: string): Promise<void> => {
  try {
    const guestDoc = doc(db, "guests", guestId);
    await deleteDoc(guestDoc);
    console.log("✅ Invitado eliminado exitosamente");
  } catch (error: any) {
    console.error("❌ Error al eliminar invitado:", error);
    throw new Error(`Error al eliminar invitado: ${error.message || error}`);
  }
};
