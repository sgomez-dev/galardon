import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import type { InvitationRequest } from "@/types/invitationRequest.type";

const requestsCol = collection(db, "invitationRequests");

export const createInvitationRequest = async (
  guestId: string,
  guestName: string,
  companionName: string
): Promise<void> => {
  try {
    await addDoc(requestsCol, {
      requestedBy: guestId,
      requestedByName: guestName,
      companionName,
      status: "pending",
      createdAt: Timestamp.now(),
    });
    console.log("✅ Solicitud de invitación creada");
  } catch (error: any) {
    console.error("❌ Error al crear solicitud:", error);
    throw new Error(`Error al crear solicitud: ${error.message || error}`);
  }
};

export const getPendingRequests = async (): Promise<InvitationRequest[]> => {
  try {
    const q = query(requestsCol, where("status", "==", "pending"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
      } as InvitationRequest;
    });
  } catch (error: any) {
    console.error("❌ Error al obtener solicitudes:", error);
    throw new Error(`Error al obtener solicitudes: ${error.message || error}`);
  }
};

export const approveRequest = async (
  requestId: string,
  adminId: string
): Promise<void> => {
  try {
    const requestDoc = doc(db, "invitationRequests", requestId);
    await updateDoc(requestDoc, {
      status: "approved",
      resolvedAt: Timestamp.now(),
      resolvedBy: adminId,
    });
    console.log("✅ Solicitud aprobada");
  } catch (error: any) {
    console.error("❌ Error al aprobar solicitud:", error);
    throw new Error(`Error al aprobar solicitud: ${error.message || error}`);
  }
};

export const rejectRequest = async (
  requestId: string,
  adminId: string
): Promise<void> => {
  try {
    const requestDoc = doc(db, "invitationRequests", requestId);
    await updateDoc(requestDoc, {
      status: "rejected",
      resolvedAt: Timestamp.now(),
      resolvedBy: adminId,
    });
    console.log("✅ Solicitud rechazada");
  } catch (error: any) {
    console.error("❌ Error al rechazar solicitud:", error);
    throw new Error(`Error al rechazar solicitud: ${error.message || error}`);
  }
};
