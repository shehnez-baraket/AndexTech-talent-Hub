import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire } from '../models/Questionnaire'; 

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private apiUrl = 'http://localhost:5159/api/Questionnaires';

  constructor(private http: HttpClient) { }

  // Récupérer tous les questionnaires
  getQuestionnaires(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(this.apiUrl);
  }

  // Récupérer un questionnaire par son ID
  getQuestionnaire(id: number): Observable<Questionnaire> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Questionnaire>(url);
  }

  // Créer un nouveau questionnaire
  createQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.post<Questionnaire>(this.apiUrl, questionnaire);
  }

  // Mettre à jour un questionnaire existant
  updateQuestionnaire(id: number, questionnaire: Questionnaire): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, questionnaire);
  }

  // Supprimer un questionnaire par son ID
  deleteQuestionnaire(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  getTotalQuestionnaireCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Count`);
  }
}
