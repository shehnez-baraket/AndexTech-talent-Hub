import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReponseCandidat } from '../models/ReponseCandidat';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
  private apiUrl = 'http://localhost:5159/api/Reponse'

  constructor(private http: HttpClient) { }

  saveReponse(reponse: ReponseCandidat): Observable<ReponseCandidat> {
    return this.http.post<ReponseCandidat>(this.apiUrl, reponse);
  }
  calculateScore(reponse: ReponseCandidat): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/CalculerScore`, reponse);
  }
  genererPdfReponsesCandidat(candidatId: number): Observable<Blob> {
    // Définir les en-têtes pour indiquer que nous attendons un blob en réponse
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'blob' as 'json'
    };

    // Appeler l'API pour générer le PDF
    return this.http.post<Blob>(`${this.apiUrl}/GenererPdfReponsesCandidat/${candidatId}`, null, httpOptions);
  }

  genererPdfResultats(candidatId: number): Observable<Blob> {
    // Définir les en-têtes pour indiquer que nous attendons un blob en réponse
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'blob' as 'json'
    };

    // Appeler l'API pour générer le PDF
    return this.http.post<Blob>(`${this.apiUrl}/GenererPdfResultats/${candidatId}`, null, httpOptions);
  }


  ActiviteCandidatQuiz(candidatId: number, quizId: number): Observable<Blob> {
    // Définir les en-têtes pour indiquer que nous attendons un blob en réponse
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'blob' as 'json'
    };

    // Appeler l'API pour générer le PDF
    return this.http.post<Blob>(`${this.apiUrl}/GenererPdfReponsesActivites/${candidatId}/${quizId}`, null, httpOptions);
  }


  ReponseCandidatQuiz(candidatId: number, quizId: number): Observable<Blob> {
    // Définir les en-têtes pour indiquer que nous attendons un blob en réponse
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'blob' as 'json'
    };

    // Appeler l'API pour générer le PDF
    return this.http.post<Blob>(`${this.apiUrl}/GenererPdfReponsesCandidat/${candidatId}/${quizId}`, null, httpOptions);
  }
  
  getStatsScoreCandidats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/StatsScoreCandidats`);
  }
}

