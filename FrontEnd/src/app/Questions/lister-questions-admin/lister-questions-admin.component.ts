import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/Services/QuestionService';
import { Question } from 'src/app/models/Question'; // Correction ici

@Component({
  selector: 'app-lister-questions-admin',
  templateUrl: './lister-questions-admin.component.html',
  styleUrls: ['./lister-questions-admin.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListerQuestionsAdminComponent {
  questions: Question[] = []; // Correction ici
  niveaux: { [key: number]: string } = {
    0: 'Débutant',
    1: 'Intermédiaire',
    2: 'Expert'
  };
  searchText: string = ''; // Déclaration de la variable searchText

  constructor(private questionService: QuestionService, private snackBar: MatSnackBar,private router: Router) { } // Correction ici

  modifierQuestion(question: Question) { // Correction ici

    this.router.navigate(['/tableauBord/modifierQuestion', question.questionId]);
  }

  ngOnInit(): void {
    this.getQuestions();
  }
  
  
  getQuestions(): void {
    this.questionService.getQuestions()
      .subscribe((questions: Question[]) => {
        this.questions = questions;
      });
  }

  deleteQuestion(id: number): void { // Correction ici

    const snackBarRef = this.snackBar.open('Voulez-vous vraiment supprimer cette question?', 'Oui', {
      duration: 5000, // Durée d'affichage du snackbar en millisecondes
      panelClass: ['custom-snackbar'] // Classe CSS personnalisée pour le snackbar
    });
    
    snackBarRef.onAction().subscribe(() => {
      const action = 'Oui'; // Ou tout autre texte de l'action du bouton "Oui"
      if (action === 'Oui') {
        this.questionService.deleteQuestion(id).subscribe(() => {
          this.getQuestions(); // Mettez à jour la liste des candidats après la suppression
        });
      }
    });
  }
  getNiveauLabel(niveauId: number): string {
    return this.niveaux[niveauId] || 'Inconnu';
  }
  filteredQuestions(): any[] {
    if (!this.searchText) {
      return this.questions;
    }
    const lowerCaseSearchText = this.searchText.toLowerCase();
    return this.questions.filter(question =>
      question.texte.toLowerCase().includes(lowerCaseSearchText) ||
      this.getNiveauLabel(question.niveauId).toLowerCase().includes(lowerCaseSearchText) ||
      question.domaine.toLowerCase().includes(lowerCaseSearchText)
    );
  }
}
