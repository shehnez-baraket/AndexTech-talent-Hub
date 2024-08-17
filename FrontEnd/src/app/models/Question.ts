import { Niveau } from "./Niveau";
import { Option } from "./Option";

export interface Question {
    questionId: number;
    texte: string;
    niveauId: number;
    domaine: string;
    option: Option[];
    point : number;
  } 