import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { Companion } from "@/types/companion.type";

const companionsCol = collection(db, "companions");

export const getCompanionsByGuest = async (
  guestId: string
): Promise<Companion[]> => {
  const q = query(companionsCol, where("linkedTo", "==", guestId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Companion));
};
