import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/Question'; 
import { Option } from '../models/Option';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:5159/api/Question';

  constructor(private http: HttpClient) { }
 

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl);
  }

  getOptionsForQuestion(id: number): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.baseUrl}/${id}/Options`);
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${id}`);
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.baseUrl, question);
  }

  updateQuestion(id: number, question: Question): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, question);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getTotalQuestionCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/Count`);
  }
}
