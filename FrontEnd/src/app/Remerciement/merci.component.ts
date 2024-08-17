import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvisClientService }  from '../Services/AvisClientService';
import { AvisClient }  from '../models/AvisClient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-merci',
  templateUrl: './merci.component.html',
  styleUrls: ['./merci.component.css']
})
export class MerciComponent {
  
  comment: string = '';
  rating: number | undefined = 0;
  candidatId!:number;
  avisClient! :AvisClient;
  
  constructor(private route: ActivatedRoute, private avisClientService: AvisClientService, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    // Récupérer le candidatId depuis les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      const candidatId = params['candidatId'];
      this.candidatId=candidatId;
      console.log('CandidatId récupéré dans MerciComponent:', candidatId);
      // Utilisez le candidatId comme nécessaire dans votre composant
    });
  }
  
  rate(selectedRating: number) {
    this.rating = selectedRating;
  }
  showNotification(message: string, type: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
  submitFeedback() {
    if (this.rating && this.comment) {
      console.log (this.rating, this.comment);
      const avisClient = {
        rating: this.rating,
        comment: this.comment,
        candidatId: this.candidatId,
        submittedAt: new Date()
      };

      this.avisClientService.submitFeedback(avisClient).subscribe(response => {
        console.log('Feedback submitted successfully', response);
        this.showNotification('Feedback submitted successfully', 'success');

      
        // Réinitialiser les valeurs après l'affichage
        this.rating = 0;
        this.comment = '';
        
      }, error => {
        console.error('Error submitting feedback', error);
      });
    } else {
      console.error('Rating and comment are required');
    }
  }
}
