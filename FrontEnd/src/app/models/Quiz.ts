import { Question } from "./Question";
import { Questionnaire } from "./Questionnaire";
import { QCM } from "./qcm";

export interface Quiz {
  quizId: number; // Le point d'interrogation indique que ce champ est optionnel
  titre: string;
  niveauId: number; // Changez le nom de `niveau` à `niveauId`
  nombreQCM: number;
  questionnaireNiveau: number;
  nombreQuestionnaires: number;
  dureeMinutes: number;
  description: string;
  questionnaireType: string;
  dateCreation?: string; // Optionnel
  qcMs?: any[]; // Optionnel, changez le type selon vos besoins
  questionnaires?: any[]; // Optionnel, changez le type selon vos besoins
}


  
  export interface QCMQuestion {
    option: any;
    quizId: number;
    qcmQuestionId: number;
    qcmId: number;
    qcm: QCM;
    questionId: number;
    question: Question[];
  }
  