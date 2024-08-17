import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { QuestionService } from 'src/app/Services/QuestionService';
import { Question } from 'src/app/models/Question';


@Component({
  selector: 'app-ajouter-question-admin',
  templateUrl: './ajouter-question-admin.component.html',
  styleUrls: ['./ajouter-question-admin.component.css']
})
export class AjouterQuestionAdminComponent implements OnInit {
  questionForm!: FormGroup;
  niveaux = [
    { value: 0, label: 'Débutant' },
    { value: 1, label: 'Intermédiaire' },
    { value: 2, label: 'Expert' }
  ];
  categories = ['java', 'c#', '.net', '.net core', 'sql', 'algorithmique'];
  selectedTags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.questionForm = this.formBuilder.group({
      texte: ['', Validators.required],
      niveau: ['', Validators.required],
      domaine: ['', Validators.required],
      options: this.formBuilder.array([], Validators.minLength(2))
    });

    // Ajouter les champs d'options à FormArray
    for (let i = 0; i < 3; i++) {
      this.addOption();
    }
  }

  // Méthode pour ajouter un champ d'option
  addOption(): void {
    const optionsFormArray = this.questionForm.get('options') as FormArray;
    optionsFormArray.push(this.formBuilder.group({
      text: ['', Validators.required],
      isCorrect: [false]
    }));
  }
  addTagFromCategory(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    if (category && !this.selectedTags.includes(category)) {
      this.selectedTags.push(category);
    }
  }

  // Getter pour accéder à FormArray pour les options
  get optionsFormArray(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  addTag(event: any): void {
    const input = event.input;
    const value = event.value;

    // Ajouter le tag à la liste des tags sélectionnés
    if ((value || '').trim() && !this.selectedTags.includes(value.trim())) {
      this.selectedTags.push(value.trim());
    }

    // Réinitialiser l'input
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  onSubmit(): void {
    console.log(this.questionForm);
    if (this.questionForm.invalid) {
      this.snackBar.open('Formulaire invalide', 'Fermer', { duration: 3000 });
      return;
    }

    // Récupérer la liste des tags
    const tagsToSend = this.selectedTags;

    const question: Question = {
      questionId: 0,
      texte: this.questionForm.value.texte,
      niveauId: this.questionForm.value.niveau,
      domaine: this.selectedTags.join(', '),
      point: this.questionForm.value.point,
      option: this.questionForm.value.options.map((option: any) => ({
        optionId: 0,
        questionId: 0,
        texte: option.text,
        estCorrect: option.isCorrect,
        selected: false
      }))
    };

    if (question.option.length < 2) {
      this.snackBar.open('Vous devez ajouter au moins deux options.', 'Fermer', { duration: 3000 });
      return;
    }

   

    // Envoyer la question au service
    this.questionService.addQuestion(question).subscribe(
      () => {
        this.snackBar.open('Question ajoutée avec succès', 'Fermer', { duration: 3000 });
        this.router.navigate(['/tableauBord/listeQuestion']); // Rediriger vers la liste des questions après l'ajout
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Une erreur est survenue lors de l\'ajout de la question', 'Fermer', { duration: 3000 });
      }
    );
  }
}
