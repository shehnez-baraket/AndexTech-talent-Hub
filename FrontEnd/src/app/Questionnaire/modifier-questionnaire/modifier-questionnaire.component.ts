import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from 'src/app/Services/Questionnaire';
import { Questionnaire } from 'src/app/models/Questionnaire';

@Component({
  selector: 'app-modifier-questionnaire',
  templateUrl: './modifier-questionnaire.component.html',
  styleUrls: ['./modifier-questionnaire.component.css']
})
export class ModifierQuestionnaireComponent implements OnInit {
  questionnaireId!: number;
  questionnaire!: Questionnaire;
  questionnaireForm!: FormGroup;
  niveaux: any[] = [
    { value: 0, label: 'Débutant' },
    { value: 1, label: 'Intermédiaire' },
    { value: 2, label: 'Expert' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private questionnaireService: QuestionnaireService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questionnaireId = +params['id'];
      this.loadQuestionnaire(this.questionnaireId);
    });

    this.initForm();
  }

  initForm(): void {
    this.questionnaireForm = this.formBuilder.group({
      enonce: ['', Validators.required],
      reponseAttendue: ['', Validators.required],
      niveau: [null, Validators.required],
      type: ['', Validators.required]
    });
  }

  loadQuestionnaire(id: number) {
    this.questionnaireService.getQuestionnaire(id).subscribe(questionnaire => {
      this.questionnaire = questionnaire;
      this.questionnaireForm.patchValue({
        enonce: questionnaire.enonce,
        reponseAttendue: questionnaire.reponseAttendue,
        niveau: questionnaire.niveauId,
        type: questionnaire.type
      });
    });
  }

  onSubmit() {
    if (this.questionnaireForm.invalid) {
      return;
    }
    const updatedQuestionnaire: Questionnaire = {
      questionnaireId: this.questionnaireId,
      enonce: this.questionnaireForm.value.enonce,
      reponseAttendue: this.questionnaireForm.value.reponseAttendue,
      niveauId: this.questionnaireForm.value.niveau,
      type: this.questionnaireForm.value.type
    };

    this.questionnaireService.updateQuestionnaire(this.questionnaireId, updatedQuestionnaire).subscribe(() => {
      this.snackBar.open('Questionnaire modifié avec succès', 'Fermer', {
        duration: 3000
      });
      this.router.navigate(['/tableauBord/listeQuestionnaire']);
    });
  }

  onAnnule() {
    this.loadQuestionnaire(this.questionnaireId);
  }
}
