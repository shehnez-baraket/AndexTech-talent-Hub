import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackingData } from '../models/TrackingData';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private readonly apiUrl = 'http://localhost:5159/api'; // URL de votre API

  constructor(private http: HttpClient) { }

  // Ajouter un événement de suivi
  addTrackingEvent(trackingData: TrackingData): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/TabTracking`, trackingData, { headers });
  }

  // Ajouter un événement de copier-coller
  addCopyPasteEvent(trackingData: TrackingData): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/CopyPasteEvent`, trackingData, { headers });
  }
}
