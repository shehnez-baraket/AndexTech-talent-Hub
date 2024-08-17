import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidatService } from 'src/app/Services/CandidatService';
import { ReponseService } from 'src/app/Services/ReponseService';

@Component({
  selector: 'app-list-quiz-par-candidat',
  templateUrl: './list-quiz-par-candidat.component.html',
  styleUrls: ['./list-quiz-par-candidat.component.css']
})
export class ListQuizParCandidatComponent implements OnInit {
  candidatId: number;
  quizId: number;
  candidatDetails: any;

  constructor(
    public dialogRef: MatDialogRef<ListQuizParCandidatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private candidatService: CandidatService,
    private reponseService: ReponseService
  ) {
    // Assigner les valeurs de candidatId et quizId à partir des données passées
    this.candidatId = data.candidatId;
    this.quizId = data.quizId;
  }

  ngOnInit(): void {
    // Vérifier si candidatId et quizId sont définis
    if (this.candidatId && this.quizId) {
      this.candidatService.getCandidatQuizDetails(this.candidatId, this.quizId).subscribe(data => {
        this.candidatDetails = data;
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  voirReponse(quizId: number): void {
    console.log(quizId);
    this.reponseService.ReponseCandidatQuiz(this.candidatId, quizId).subscribe((blob: Blob) => {
      // Créer un objet URL pour le blob
      const url = window.URL.createObjectURL(blob);

      // Créer un lien pour le téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport_reponses.pdf`;

      // Ajouter le lien à la page et cliquer dessus pour déclencher le téléchargement
      document.body.appendChild(link);
      link.click();

      // Nettoyer l'URL de l'objet
      window.URL.revokeObjectURL(url);
    });
  }


  voirActivite(quizid: number) {
    console.log(quizid);
    this.reponseService.ActiviteCandidatQuiz(this.candidatId, quizid).subscribe((blob: Blob) => {
      // Créer un objet URL pour le blob
      const url = window.URL.createObjectURL(blob);

      // Créer un lien pour le téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport_activites.pdf`;

      // Ajouter le lien à la page et cliquer dessus pour déclencher le téléchargement
      document.body.appendChild(link);
      link.click();

      // Nettoyer l'URL de l'objet
      window.URL.revokeObjectURL(url);
    });
  }
}
