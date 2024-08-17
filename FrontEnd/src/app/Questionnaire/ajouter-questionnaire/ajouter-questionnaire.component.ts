import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuestionnaireService } from 'src/app/Services/Questionnaire';
import { Questionnaire } from 'src/app/models/Questionnaire';

@Component({
  selector: 'app-ajouter-questionnaire',
  templateUrl: './ajouter-questionnaire.component.html',
  styleUrls: ['./ajouter-questionnaire.component.css']
})
export class AjouterQuestionnaireComponent  implements OnInit {
  questionnaireForm!: FormGroup;
  niveaux = [
    { value: 0, label: 'Débutant' },
    { value: 1, label: 'Intermédiaire' },
    { value: 2, label: 'Expert' }
  ];
  types = [
    { value: 'java', label: 'Java' },
    { value: 'c#', label: 'C#' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private questionnaireService: QuestionnaireService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.questionnaireForm = this.formBuilder.group({
      enonce: ['', Validators.required],
      reponseAttendue: ['', Validators.required],
      niveau: ['', Validators.required],
      type: ['csharp', Validators.required],
      point: [0]
    });
  }

  onSubmit(): void {
    if (this.questionnaireForm.invalid) {
      this.snackBar.open('Formulaire invalide', 'Fermer', { duration: 3000 });
      return;
    }

    const questionnaire: Questionnaire = {
      questionnaireId: 0,  // assuming a new questionnaire
      enonce: this.questionnaireForm.value.enonce,
      reponseAttendue: this.questionnaireForm.value.reponseAttendue,
      niveauId: this.questionnaireForm.value.niveau,
      type: this.questionnaireForm.value.type,
      // add other fields if necessary
    };

    this.questionnaireService.createQuestionnaire(questionnaire).subscribe(
      () => {
        this.snackBar.open('Questionnaire ajouté avec succès', 'Fermer', { duration: 3000 });
        this.router.navigate(['/tableauBord/listeQuestionnaire']); // Rediriger vers la liste des questionnaires après l'ajout
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Une erreur est survenue lors de l\'ajout du questionnaire', 'Fermer', { duration: 3000 });
      }
    );
  }
}