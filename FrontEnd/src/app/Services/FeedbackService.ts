import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/FeedBack';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:5159/api/Feedbacks';

  constructor(private http: HttpClient) { }

  saveFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }
    // Récupérer un feedback par son ID
    getFeedbackById(id: number): Observable<Feedback> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Feedback>(url);
    }
  
    // Mettre à jour un feedback
    updateFeedback(feedback: Feedback): Observable<any> {
      const url = `${this.apiUrl}/${feedback.id}`;
      return this.http.put(url, feedback);
    }
  
    // Supprimer un feedback
    deleteFeedback(id: number): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete(url);
    }
}