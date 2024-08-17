import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/Services/QuizService';
import { Quiz } from 'src/app/models/Quiz';
import { CandidateSelectionDialogComponent } from '../candidate-selection-dialog/candidate-selection-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-liste-quiz',
  templateUrl: './liste-quiz.component.html',
  styleUrls: ['./liste-quiz.component.css']
})
export class ListeQuizComponent implements OnInit {

  quizzes: Quiz[] = [];
  niveaux: { [key: number]: string } = {
    0: 'Débutant',
    1: 'Intermédiaire',
    2: 'Expert'
  };
  constructor(
    private quizService: QuizService,
    private snackBar: MatSnackBar,
    private router: Router,
   private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
      },
      error => {
        console.error('Erreur lors de la récupération des quiz:', error);
      }
    );
  }

  editQuiz(quizId: number): void {
    this.router.navigate([`/editQuiz/${quizId}`]);
  }

  deleteQuiz(quizId: number): void {
    const snackBarRef = this.snackBar.open('Voulez-vous vraiment supprimer ce quiz?', 'Oui', {
      duration: 5000, // Durée d'affichage du snackbar en millisecondes
      panelClass: ['custom-snackbar'] // Classe CSS personnalisée pour le snackbar
    });
    
    snackBarRef.onAction().subscribe(() => {
      const action = 'Oui'; // Ou tout autre texte de l'action du bouton "Oui"
      if (action === 'Oui') {
        this.quizService.deleteQuiz(quizId).subscribe(() => {
          this.ngOnInit(); // Mettez à jour la liste des candidats après la suppression
        });
      }
    });
    
  }
  openCandidateSelectionDialog(quizId: number): void {
    this.dialog.open(CandidateSelectionDialogComponent, {
      data: { quizId: quizId }
    });
  }

  getNiveauLabel(niveauId: number): string {
    return this.niveaux[niveauId] || 'Inconnu';
  }
}

