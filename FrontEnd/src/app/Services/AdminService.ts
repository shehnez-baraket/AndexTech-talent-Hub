import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { admin } from '../models/admin'; 

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5159/api/Utilisateur'; // URL de base de votre API

  constructor(private http: HttpClient) { }

  // Récupère la liste des admins depuis l'API
  getAdmins(): Observable<admin[]> {
    return this.http.get<admin[]>(`${this.apiUrl}/utilisateurs`);
  }

  // Récupère un admin spécifique par son ID
  getAdminById(id: number): Observable<admin> {
    return this.http.get<admin>(`${this.apiUrl}/utilisateur/${id}`);
  }

  // Crée un nouvel admin en utilisant l'API
  createAdmin(admin: admin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, admin);
  }

  // Met à jour un admin existant
  updateAdmin(id: number, admin: admin): Observable<admin> {
    return this.http.put<any>(`${this.apiUrl}/utilisateur/${id}`, admin);
  }

  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    const payload = { userId, oldPassword, newPassword };
    return this.http.post<any>(`${this.apiUrl}/change-password`, payload);
  }

  // Supprime un admin par son ID
  deleteAdmin(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/utilisateur/${id}`);
  }
}
