import { Component, OnInit } from '@angular/core';
import { CandidatService } from '../../Services/CandidatService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReponseCandidat } from 'src/app/models/ReponseCandidat';
import { ReponseService } from 'src/app/Services/ReponseService';
import { MatDialog } from '@angular/material/dialog';

import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';
import { QuizService } from 'src/app/Services/QuizService';
import { Candidat } from 'src/app/models/Candidat';
import { Quiz } from 'src/app/models/Quiz';
import { ListQuizParCandidatComponent } from '../list-quiz-par-candidat/list-quiz-par-candidat.component';
@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidats: any[] = [];
  quizzes: Quiz[] = [];
  showQuizzes: boolean = false;
  currentCandidat!: Candidat;

  constructor(private candidatService: CandidatService, 
    private snackBar: MatSnackBar, 
    private router: Router,
  private reponseService:ReponseService,
  public dialog: MatDialog,
  private quizService: QuizService) { }
  ngOnInit(): void {
    this.candidatService.getCandidatsWithQuizStatus().subscribe(candidats => {
      this.candidats = candidats;
      console.log(this.candidats); // Affiche les candidats après que la requête a terminé
    });
  }
  
  /*afficherQuizzes(candidatId: number): void {
    this.quizService.getQuizzesByCandidat(candidatId).subscribe(data => {
      const candidat = this.candidats.find(c => c.id === candidatId);
      const dialogRef = this.dialog.open(ListQuizParCandidatComponent, {
        width: '600px',
        data: { candidat: candidat, quizzes: data }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }*/
    afficherQuizzes(candidatId: number): void {
      this.quizService.getQuizzesByCandidat(candidatId).subscribe(data => {
        const candidat = this.candidats.find(c => c.id === candidatId);
        const dialogRef = this.dialog.open(ListQuizParCandidatComponent, {
          width: '600px',
          data: { candidatId: candidatId, quizId: undefined, candidat: candidat, quizzes: data } // Passer candidatId et quizId ici
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      });
    }

  closeModal(): void {
    this.showQuizzes = false;
  }

  genererPdf(candidatId: number) {
    this.reponseService.genererPdfReponsesCandidat(candidatId).subscribe((blob: Blob) => {
      // Créer un objet URL pour le blob
      const url = window.URL.createObjectURL(blob);
  
      // Créer un lien pour le téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport_reponses_${candidatId}.pdf`;
  
      // Ajouter le lien à la page et cliquer dessus pour déclencher le téléchargement
      document.body.appendChild(link);
      link.click();
  
      // Nettoyer l'URL de l'objet
      window.URL.revokeObjectURL(url);
    });
  }

  Feedback(candidat: any) {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '400px',
      data: candidat
    });

    dialogRef.afterClosed().subscribe((result: { avis: any; }) => {
      if (result) {
        console.log('Avis:', result.avis);
    
      }
    });
  }

  
  getCandidats(): void {
    this.candidatService.getCandidats()
      .subscribe((candidats: any[]) => {
        this.candidats = candidats;
      });
  }
    modifierCandidat(candidat: any) {
      this.router.navigate(['/tableauBord/modifierCandidat', candidat.id]);

  }
  
  supprimerCandidat(id: number) {
    const snackBarRef = this.snackBar.open('Voulez-vous vraiment supprimer ce candidat?', 'Oui', {
      duration: 5000, // Durée d'affichage du snackbar en millisecondes
      panelClass: ['custom-snackbar'] // Classe CSS personnalisée pour le snackbar
    });
    
    snackBarRef.onAction().subscribe(() => {
      const action = 'Oui'; // Ou tout autre texte de l'action du bouton "Oui"
      if (action === 'Oui') {
        this.candidatService.supprimerCandidat(id).subscribe(() => {
          this.getCandidats(); // Mettez à jour la liste des candidats après la suppression
        });
      }
    });
    
  }
  masquerCandidat(candidat: any): void {
    candidat.masque = true;
    // Filtrer les candidats masqués et les retirer du tableau
    this.candidats = this.candidats.filter(c => !c.masque);
}

  Activite(candidatId: number) {
    this.reponseService.genererPdfResultats(candidatId).subscribe((blob: Blob) => {
      // Créer un objet URL pour le blob
      const url = window.URL.createObjectURL(blob);
  
      // Créer un lien pour le téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport_activité.pdf`;
  
      // Ajouter le lien à la page et cliquer dessus pour déclencher le téléchargement
      document.body.appendChild(link);
      link.click();
  
      // Nettoyer l'URL de l'objet
      window.URL.revokeObjectURL(url);
    });
  }

    
}
