import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CandidatService } from 'src/app/Services/CandidatService';
import { FeedbackService } from 'src/app/Services/FeedbackService';
import { Feedback } from 'src/app/models/FeedBack';

@Component({
  selector: 'app-lister-feedbacks',
  templateUrl: './lister-feedbacks.component.html',
  styleUrls: ['./lister-feedbacks.component.css']
})
export class ListerFeedbacksComponent implements OnInit {

  feedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService, private candidatService: CandidatService,
    private snackBar: MatSnackBar,    private router: Router

  ) { }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
      this.feedbacks.forEach(feedback => {
        this.getCandidatDetails(feedback.candidatId, feedback);
      });
    });
  }

  getCandidatDetails(candidatId: number, feedback: Feedback): void {
    this.candidatService.getCandidatById(candidatId).subscribe(candidat => {
      feedback.candidatDetails = candidat;
    });
  }
  supprimerFeedback(id: number) {
    const snackBarRef = this.snackBar.open('Voulez-vous vraiment supprimer ce Feedback?', 'Oui', {
      duration: 5000, // Durée d'affichage du snackbar en millisecondes
      panelClass: ['custom-snackbar'] // Classe CSS personnalisée pour le snackbar
    });
    
    snackBarRef.onAction().subscribe(() => {
      const action = 'Oui'; // Ou tout autre texte de l'action du bouton "Oui"
      if (action === 'Oui') {
        this.feedbackService.deleteFeedback(id).subscribe(() => {
          this.getFeedbacks(); // Mettez à jour la liste des candidats après la suppression
        });
      }
    });
    
  }
modifierFeedback( feedback: Feedback) {
  this.router.navigate(['/tableauBord/modifierFeedback',feedback.id]);
}
}