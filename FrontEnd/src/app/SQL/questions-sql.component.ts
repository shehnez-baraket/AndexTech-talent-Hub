import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Questionnaire } from '../models/Questionnaire';

interface SqlResult {
  id: number;
  description: string;
}

@Component({
  selector: 'app-questions-sql',
  templateUrl: './questions-sql.component.html',
  styleUrls: ['./questions-sql.component.css']
})
export class QuestionsSqlComponent {
  @Input() questionnaire!: Questionnaire;


  expectedSqlQuery: string = 'SELECT * FROM notes';
  isCorrect: boolean = false;
  sqlResults: SqlResult[] = [];
  errorMessage: string | null = null;
  userSqlQuery: string = ''; // Ajout de la propriété pour stocker la requête SQL de l'utilisateur

  constructor(private router: Router, private http: HttpClient) { }

  onSubmitQuiz() {
    const confirmSubmit = confirm("Êtes-vous sûr de vouloir soumettre votre quiz? Cette action est irréversible.");
    if (confirmSubmit) {
      this.router.navigateByUrl('/merci');
    } else {
      // Action annulée
    }
  }

  executeSQL() {
    const sqlQuery = (document.getElementById('sql-query-input') as HTMLTextAreaElement).value.trim();    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    this.http.post<SqlResult[]>('http://localhost:5159/api/sql', JSON.stringify(sqlQuery), { headers }).subscribe(
      response => {
        console.log('Résultat de la requête SQL :', response);
        this.sqlResults = response;
        // Comparaison de la requête de l'utilisateur avec la requête attendue
        this.isCorrect = sqlQuery.toLowerCase() === this.expectedSqlQuery.toLowerCase();
        console.log(this.isCorrect);
        this.errorMessage = null;
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la soumission de la requête SQL :', error);
        this.errorMessage = error.error;
      }
    );
  }
}
