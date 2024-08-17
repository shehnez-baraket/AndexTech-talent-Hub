import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuizService } from 'src/app/Services/QuizService';
import { CandidatService } from 'src/app/Services/CandidatService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidat } from 'src/app/models/Candidat';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-candidate-selection-dialog',
  templateUrl: './candidate-selection-dialog.component.html',
  styleUrls: ['./candidate-selection-dialog.component.css']
})
export class CandidateSelectionDialogComponent implements OnInit {
  candidates: Candidat[] = [];
  filteredCandidates: Candidat[] = [];
  candidateForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CandidateSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { quizId: number },
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private candidatService: CandidatService,
    private snackBar: MatSnackBar,
  ) {
    this.candidateForm = this.formBuilder.group({
      searchEmail: [''],
      candidates: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.candidatService.getCandidats().subscribe(
      (candidates) => {
        this.candidates = candidates;
        this.filteredCandidates = candidates;
        this.candidates.forEach(() => {
          this.candidatesArray.push(this.formBuilder.control(false));
        });
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Erreur lors du chargement des candidats', 'Fermer', { duration: 3000 });
      }
    );

    this.candidateForm.get('searchEmail')?.valueChanges.subscribe(searchTerm => {
      this.filteredCandidates = this.filterCandidates(searchTerm);
    });
  }

  get candidatesArray(): FormArray {
    return this.candidateForm.get('candidates') as FormArray;
  }

  filterCandidates(searchTerm: string): Candidat[] {
    return this.candidates.filter(candidate => candidate.adresseEmail.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  sendInvitations(): void {
    const selectedCandidates = this.candidatesArray.controls
      .map((control, index) => (control.value ? this.filteredCandidates[index] : null))
      .filter(candidate => candidate !== null);

    selectedCandidates.forEach((candidate: any) => {
      if (candidate) {
        const candidatId = candidate.id;
        const candidateEmail = candidate.adresseEmail;

        this.quizService.generateQuizLink(candidatId, this.data.quizId).subscribe(
          (linkResponse: any) => {
            const quizLink = linkResponse.link;
            this.sendInvitationByEmail(candidateEmail).subscribe(
              () => {
                this.snackBar.open('Invitation envoyée avec succès', 'Fermer', { duration: 3000 });

                console.log(`Invitation envoyée avec succès à ${candidateEmail}`);
              },
              (error: any) => {
                this.snackBar.open('Erreur lors de l\'envoi de l\'invitation par email', 'Fermer', { duration: 3000 });

                console.error(`Erreur lors de l'envoi de l'invitation par email à ${candidateEmail} :`, error);
              }
            );
          },
          (error: any) => {
            console.error('Erreur lors de la génération du lien du quiz :', error);
          }
        );
      }
    });
  }

  sendInvitationByEmail(email: string): Observable<any> {
    return this.quizService.sendInvitation(email);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
