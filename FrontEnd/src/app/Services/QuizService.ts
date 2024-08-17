import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QCMQuestion, Quiz } from '../models/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  generateLinkAndSendEmail(id: any, quizId: number, email: any) {
    throw new Error('Method not implemented.');
  }
  
  private apiUrl = 'http://localhost:5159/api/Quiz'; 
  private tokenApiUrl = 'http://localhost:5159/Token'; // URL du contrôleur Token
  private lienQuizApiUrl = 'http://localhost:5159'; // URL du contrôleur LienQuiz
  private apiQcmQuestion = 'http://localhost:5159/api/QCMQuestion';
  private baseUrl = 'http://localhost:5159/api/candidats';

  constructor(private http: HttpClient) {}

  getQCMQuestionsByQuizId(quizId: number): Observable<QCMQuestion[]> {
    return this.http.get<QCMQuestion[]>(`http://localhost:5159/api/QCMQuestion?quizId=${quizId}`);
  }
  getQuizById(quizId: number): Observable<Quiz> {
    const url = `${this.apiUrl}/${quizId}`;
    return this.http.get<Quiz>(url);
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    const url = `${this.apiUrl}/CreerQuiz`;
    return this.http.post<Quiz>(url, quiz);
  }
  
  updateQuiz(quiz: Quiz): Observable<Quiz> {
    const url = `${this.apiUrl}/${quiz.quizId}`;
    return this.http.put<Quiz>(url, quiz);
  }

  deleteQuiz(quizId: number): Observable<any> {
    const url = `${this.apiUrl}/${quizId}`;
    return this.http.delete<any>(url);
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl);
  }

  getTotalQuizCount(): Observable<number> {
    const url = `${this.apiUrl}/Count`;
    return this.http.get<number>(url);
  }
  sendInvitation(email: string): Observable<any> {
    const url = `${this.tokenApiUrl}/send?email=${email}`;
    return this.http.post<any>(url, {});
  }

  generateQuizLink(candidatId: number, quizId: number): Observable<any> {
    const url = `${this.lienQuizApiUrl}/GenerateLink?candidatId=${candidatId}&quizId=${quizId}`;
    return this.http.post(url, {});
  }
  validerLienQuiz(token: string): Observable<any> {
    return this.http.get<any>(`${this.lienQuizApiUrl}/valider/${token}`);
  }
  getQuizzesByCandidat(candidatId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/${candidatId}/quizzes`);
  }
  
  
  
}
