export interface Guest {
  id: string;
  name: string;
  slug: string;
  isGoing: boolean | null;
  companions: string[];
  maxCompinions: number;
  isCompanion: boolean;
  linkedTo?: string;
  confirmedBy?: string;
}
