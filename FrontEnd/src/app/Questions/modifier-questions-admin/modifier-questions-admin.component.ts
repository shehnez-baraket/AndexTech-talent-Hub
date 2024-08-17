import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { QuestionService } from '../../Services/QuestionService'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../models/Question';
import { Option } from 'src/app/models/Option';

@Component({
  selector: 'app-modifier-questions-admin',
  templateUrl: './modifier-questions-admin.component.html',
  styleUrls: ['./modifier-questions-admin.component.css']
})
export class ModifierQuestionsAdminComponent implements OnInit {
  questionId!: number;
  question!: Question;
  questionForm!: FormGroup;
  optionsFormArray!: FormArray;
  niveaux = [
    { value: 0, label: 'Débutant' },
    { value: 1, label: 'Intermédiaire' },
    { value: 2, label: 'Expert' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private snackBar: MatSnackBar
  ) {
    this.questionForm = this.formBuilder.group({
      texte: ['', Validators.required],
      domaine: ['', Validators.required],
      niveau: [null, Validators.required],
      options: this.formBuilder.array([])
    });
    this.optionsFormArray = this.questionForm.get('options') as FormArray;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.questionId = +params['id'];
      this.loadQuestion(this.questionId);
    });
  }

  loadQuestion(id: number) {
    this.questionService.getQuestionById(id).subscribe(question => {
      this.question = question;
      this.questionForm.patchValue({
        texte: question.texte,
        domaine: question.domaine,
        niveau: question.niveauId
      });
      this.loadOptionsForQuestion(id);
    });
  }

  loadOptionsForQuestion(questionId: number) {
    this.questionService.getOptionsForQuestion(questionId).subscribe(options => {
      this.optionsFormArray.clear();
      options.forEach(option => {
        this.optionsFormArray.push(
          this.formBuilder.group({
            texte: [option.texte, Validators.required],
            estCorrect: [option.estCorrect]
          })
        );
      });
    });
  }

  onSubmit() {
    if (this.questionForm.invalid) {
      return;
    }
  
    const updatedQuestion: Question = {
      questionId: this.questionId,
      texte: this.questionForm.value.texte,
      domaine: this.questionForm.value.domaine,
      niveauId: this.questionForm.value.niveau,
      option: this.optionsFormArray.value,
      point: this.questionForm.value.point  // Récupérer les valeurs des options depuis le formulaire

    };
  
    this.questionService.updateQuestion(this.questionId, updatedQuestion)
      .subscribe(() => {
        this.snackBar.open('Question modifiée avec succès', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['/tableauBord/listeQuestion']);
      });
  }
  

  onCancel() {
    // Logique pour annuler la modification
  }
}
