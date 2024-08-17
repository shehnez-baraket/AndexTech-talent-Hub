import { Candidat } from "./Candidat";

export interface Feedback {
  id: number;
    candidatId: number;
    avis: string;
    dateFeedback: Date;
    candidatDetails?: Candidat; // Propriété pour stocker les détails du candidat

  }
  