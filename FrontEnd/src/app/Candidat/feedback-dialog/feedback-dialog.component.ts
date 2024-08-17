import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FeedbackService } from 'src/app/Services/FeedbackService';
import { Candidat } from 'src/app/models/Candidat';
import { Feedback } from 'src/app/models/FeedBack';
@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent {
  avis: string = '';

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidat,
    private feedbackService: FeedbackService
  ) {}
 


  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const feedback = {
      id:0,
      candidatId: this.data.id,
      avis: this.avis,
      dateFeedback: new Date()
    };

    this.feedbackService.saveFeedback(feedback).subscribe(response => {
      console.log('Feedback saved', response);
      this.dialogRef.close({ avis: this.avis });
    }, error => {
      console.error('Error saving feedback', error);
    });
  }
}
