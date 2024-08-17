import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvisClient } from '../models/AvisClient';

@Injectable({
  providedIn: 'root'
})
export class AvisClientService {
  private apiUrl = 'http://localhost:5159/api/AvisClient'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  submitFeedback(AvisClient: AvisClient): Observable<any> {
    return this.http.post<any>(this.apiUrl, AvisClient);
  }
  getAvisCountByStars(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/countByStars`);
  }
  getAvis(): Observable<AvisClient[]> {
    return this.http.get<AvisClient[]>(this.apiUrl);
  }
}

