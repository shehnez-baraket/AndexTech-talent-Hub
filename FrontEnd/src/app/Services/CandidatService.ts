import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidat } from '../models/Candidat';
@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  

  private apiUrl = 'http://localhost:5159/api/Candidats'; // Remplacez par l'URL de votre API
  private Statut = 'http://localhost:5159/api/Candidats/GetCandidatsWithQuizStatus';


  constructor(private http: HttpClient) { }

  ajouterCandidat(candidat: Candidat): Observable<any> {
    return this.http.post<any>(this.apiUrl, candidat); // Envoyer le candidat en tant que corps de la requête POST
  }
  getCandidats(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(`${this.apiUrl}`);
  }

  supprimerCandidat(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
  getCandidatById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
  modifierCandidat(id: number, candidat: Candidat): Observable<Candidat> {
    return this.http.put<Candidat>(`${this.apiUrl}/${id}`, candidat);
  }
  getCandidatsWithQuizStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.Statut);
  }
  getCandidatQuizDetails(candidatId: number, quizId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetCandidatQuizDetails/${candidatId}/${quizId}`);
  }
  getTotalCandidatsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Count`);
  }
  
}
