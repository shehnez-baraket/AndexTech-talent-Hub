import { Question } from "./Question";


 
  export interface QCM {
    qcmId: number;
    titre: string;
    description: string;
    nombreQuestions: number;
    niveauId: number;
  }
  
  // models/qcmdto.ts
  export interface QCMDTO {
    QCMId :number;
    titre: string;
    description: string;
    questions: QuestionDTO[];
  }
  
  export interface QuestionDTO {
    texte: string;
    choix: ChoixDTO[];
  }
  
  export interface ChoixDTO {
    texte: string;
    estCorrect: boolean;
  }
  