import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QCM, QCMDTO } from '../models/qcm';
import { QCMQuestion } from '../models/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QCMService {

  private apiUrl = 'http://localhost:5159/api/QCM';

  constructor(private http: HttpClient) { }

  // Récupérer tous les QCMs
  getQCMs(): Observable<QCM[]> {
    return this.http.get<QCM[]>(this.apiUrl);
  }
  getQCMQuestionsByQuizId(quizId: number): Observable<QCMQuestion[]> {
    return this.http.get<QCMQuestion[]>(`http://localhost:5159/api/QCMQuestion?quizId=${quizId}`);
  }
 
  // Récupérer les détails d'un QCM avec ses questions et options
  getQCMDetails(qcmId: number): Observable<QCMQuestion[]> {
    return this.http.get<QCMQuestion[]>(`api/QCM/QuestionsAndOptions/${qcmId}`);
  }
  // Récupérer un QCM (probablement sans questions et options)
  // Conservez cette méthode si nécessaire, sinon supprimez-la
  getQCM(id: number): Observable<QCM> {
    return this.http.get<QCM>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau QCM
  createQCM(qcmDTO: QCMDTO): Observable<QCM> {
    return this.http.post<QCM>(this.apiUrl, qcmDTO);
  }

  // Supprimer un QCM
  deleteQCM(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getTotalQcmCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Count`);
  }
}
