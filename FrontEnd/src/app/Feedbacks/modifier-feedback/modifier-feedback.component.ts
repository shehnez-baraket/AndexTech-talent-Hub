import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from 'src/app/Services/FeedbackService';
import { Feedback } from 'src/app/models/FeedBack';
import { Candidat } from 'src/app/models/Candidat';
import { CandidatService } from 'src/app/Services/CandidatService';

@Component({
  selector: 'app-modifier-feedback',
  templateUrl: './modifier-feedback.component.html',
  styleUrls: ['./modifier-feedback.component.css']
})
export class ModifierFeedbackComponent implements OnInit {
 
  feedbackForm!: FormGroup;
  feedbackId!: number;
  candidatId!: number; // Ajoutez cette propriété pour stocker l'ID du candidat

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private feedbackService: FeedbackService,
    private candidatService: CandidatService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.feedbackId = +idParam;
        this.loadFeedback();
      } else {
        // Gérer le cas où l'ID est null
        console.error('ID du feedback non trouvé dans les paramètres de l\'URL');
      }
    });

    this.feedbackForm = this.formBuilder.group({
      avis: ['', Validators.required],
      nom: ['', Validators.required], // Champ nom
      prenom: ['', Validators.required], // Champ prénom
      adresseEmail: ['', [Validators.required, Validators.email]], // Champ adresse email
    });
  }

  loadFeedback(): void {
    this.feedbackService.getFeedbackById(this.feedbackId).subscribe(feedback => {
      this.feedbackForm.patchValue({
        avis: feedback?.avis,
        // Patchez d'autres champs du feedback si nécessaire
      });
      this.candidatId = feedback.candidatId; // Récupérez l'ID du candidat
      this.getCandidatDetails(this.candidatId);
    });
  }

  getCandidatDetails(candidatId: number): void {
    this.candidatService.getCandidatById(candidatId).subscribe(candidat => {
      this.feedbackForm.patchValue({
        nom: candidat.nom,
        prenom: candidat.prenom,
        adresseEmail: candidat.adresseEmail
      });
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) {
      return;
    }
    
    const updatedFeedback: Feedback = {
      id: this.feedbackId,
      candidatId: this.candidatId, // Utilisez l'ID du candidat récupéré
      avis: this.feedbackForm.get('avis')?.value,
      dateFeedback: new Date()
    };

    this.feedbackService.updateFeedback(updatedFeedback).subscribe(() => {
      this.snackBar.open('Feedback modifié avec succès', 'Fermer', {
        duration: 3000
      });
      this.router.navigate(['/tableauBord/listeFeedback']); // Redirigez où vous voulez après la modification
    }, error => {
      console.error('Erreur lors de la modification du feedback', error);
      this.snackBar.open('Erreur lors de la modification du feedback', 'Fermer', {
        duration: 3000
      });
    });
  }
}
