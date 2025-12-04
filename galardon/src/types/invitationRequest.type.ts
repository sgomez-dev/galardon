export interface InvitationRequest {
  id: string;
  requestedBy: string; // ID del invitado que hace la solicitud
  requestedByName: string; // Nombre del invitado que hace la solicitud
  companionName: string; // Nombre del acompañante solicitado
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string; // ID del admin que resolvió
}
