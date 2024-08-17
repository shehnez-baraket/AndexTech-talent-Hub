import { Niveau } from "./Niveau";

export interface Questionnaire {
    questionnaireId: number;
    enonce: string;
    reponseAttendue: string;
    niveauId: number;
    type: string;
    qcmId?: number; 
  }
  
