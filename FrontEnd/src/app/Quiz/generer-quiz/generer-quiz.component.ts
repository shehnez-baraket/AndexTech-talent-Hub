import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/Services/QuizService';
import { Quiz } from 'src/app/models/Quiz';

@Component({
  selector: 'app-generer-quiz',
  templateUrl: './generer-quiz.component.html',
  styleUrls: ['./generer-quiz.component.css']
})
export class GenererQuizComponent implements OnInit {
  quizForm!: FormGroup;
  niveaux = [
    { value: 0, label: 'Débutant' },
    { value: 1, label: 'Intermédiaire' },
    { value: 2, label: 'Expert' }
  ];
  questionnaireNiveaux = [
    { value: 0, label: 'Débutant' },
    { value: 1, label: 'Intermédiaire' },
    { value: 2, label: 'Expert' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      titre: ['', Validators.required],
      niveauId: [null, Validators.required],
      nombreQCM: [null, Validators.required],
      questionnaireNiveau: [null, Validators.required],
      nombreQuestionnaires: [null, Validators.required],
      dureeMinutes: [null, Validators.required],
      description: ['', Validators.required],
      questionnaireType: ['', Validators.required],

    });
  }

  onSubmit(): void {
    if (this.quizForm.invalid) {
      return;
    }

    this.quizService.createQuiz(this.quizForm.value).subscribe(
      () => { 
        this.snackBar.open('Quiz créé avec succès', 'Fermer', {duration: 3000 });
        this.router.navigate(['tableauBord/listeQuiz']);
      },
      error => {
        this.snackBar.open('Erreur lors de la création du Quiz', 'Fermer', {
          duration: 3000
        });
        console.log(this.quizForm.value);
        console.error('Erreur lors de la création du Quiz:', error);
      }
    );
  }

}