export interface Invitation {
  id: string;
  guestId: string;
  dateSent: Date;
  status: "pending" | "confirmed" | "declined";
}
