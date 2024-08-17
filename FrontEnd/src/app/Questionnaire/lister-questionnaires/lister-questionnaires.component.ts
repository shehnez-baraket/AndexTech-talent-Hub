import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuestionnaireService } from 'src/app/Services/Questionnaire';
import { Questionnaire } from 'src/app/models/Questionnaire';

@Component({
  selector: 'app-lister-questionnaires',
  templateUrl: './lister-questionnaires.component.html',
  styleUrls: ['./lister-questionnaires.component.css']
})
export class ListerQuestionnairesComponent implements OnInit {
  questionnaires: Questionnaire[] = [];
  niveaux: { [key: number]: string } = {
    0: 'Débutant',
    1: 'Intermédiaire',
    2: 'Expert'
  };
  searchText: string = ''; // Déclaration de la variable searchText

  constructor(private questionnaireService: QuestionnaireService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadQuestionnaires();
  }

  loadQuestionnaires() {
    this.questionnaireService.getQuestionnaires().subscribe(
      questionnaires => this.questionnaires = questionnaires,
      error => console.error(error)
    );
  }

  editQuestionnaire(questionnaire: Questionnaire) {
    this.router.navigate(['/tableauBord/modifierQuestionnaire', questionnaire.questionnaireId]);
  }

  deleteQuestionnaire(questionnaireId: number) {
    const snackBarRef = this.snackBar.open('Voulez-vous vraiment supprimer ce candidat?', 'Oui', {
      duration: 5000, // Durée d'affichage du snackbar en millisecondes
      panelClass: ['custom-snackbar'] // Classe CSS personnalisée pour le snackbar
    });
    snackBarRef.onAction().subscribe(() => {
      this.questionnaireService.deleteQuestionnaire(questionnaireId).subscribe(
        () => {
          // Actualiser la liste après la suppression
          this.loadQuestionnaires();
        },
        error => console.error(error)
      );
    });
  }

  getNiveauLabel(niveauId: number): string {
    return this.niveaux[niveauId] || 'Inconnu';
  }
  filteredQuestions(): any[] {
    if (!this.searchText) {
      return this.questionnaires;
    }
    const lowerCaseSearchText = this.searchText.toLowerCase();
    return this.questionnaires.filter(question =>
      question.enonce.toLowerCase().includes(lowerCaseSearchText) ||
      this.getNiveauLabel(question.niveauId).toLowerCase().includes(lowerCaseSearchText) ||
      question.type.toLowerCase().includes(lowerCaseSearchText) || question.reponseAttendue.toLowerCase().includes(lowerCaseSearchText)
    );
  }
}
