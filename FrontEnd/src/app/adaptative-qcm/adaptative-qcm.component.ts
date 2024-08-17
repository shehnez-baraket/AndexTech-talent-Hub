import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz, QCMQuestion } from '../models/Quiz';
import { QuizService } from '../Services/QuizService';
import { QCMService } from '../Services/QCMService';
import { HttpClient } from '@angular/common/http';
import { ReponseService } from '../Services/ReponseService';
import { ReponseCandidat } from '../models/ReponseCandidat';
import { jwtDecode } from 'jwt-decode';
import { TimerComponentComponent } from '../Chrono/timer-component.component';
import { TrackingService } from '../Services/TrackingService';
import { Questionnaire } from '../models/Questionnaire';
import { Option } from '../models/Option';
import { SharedCodeService } from '../Services/SharedCodeService';

@Component({
  selector: 'app-adaptative-qcm',
  templateUrl: './adaptative-qcm.component.html',
  styleUrls: ['./adaptative-qcm.component.css']
})
export class AdaptativeQcmComponent implements OnInit {
  @ViewChild(TimerComponentComponent)
  
  private timerComponent!: TimerComponentComponent;

  qcmQuestions: QCMQuestion[] = [];
  candidateId!: number;
  score: number = 0;
  quiz!: Quiz;
  questionnaires: Questionnaire[] = [];
quizId!:number;
timerStopped: boolean = false;
@Input() codeFromIDE: string = ''; 
code: string = '';  // Variable to store the code from the IDE

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private qcmService: QCMService,
    private http: HttpClient,
    private reponseService: ReponseService,
    private router: Router,
    private trackingService: TrackingService,
    private sharedCodeService: SharedCodeService  // Inject the shared service

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.quizService.validerLienQuiz(token).subscribe(
          (response) => {
            console.log('Lien du quiz validé avec succès:', response);
            // Maintenant, chargez le quiz une fois que le lien est validé
            const decodedToken = this.decodeToken(token);
            const quizId = decodedToken['QuizId'];
            const candidateId = decodedToken['nameid'];
            console.log('Token décodé :', decodedToken);
            console.log('ID du quiz récupéré :', quizId);
            console.log('ID du candidat récupéré :', candidateId);
            this.loadQuiz(quizId, candidateId);
          },
          (error) => {
            this.router.navigate(['/remerciement']);

            console.error('Erreur lors de la validation du lien du quiz:', error);
            // Gérer l'erreur de validation du lien du quiz ici
          }
        );
      } else {
        console.error('Token manquant dans l\'URL');
      }
    });

    if (this.timerComponent) {
      this.timerComponent.timerExpired.subscribe(() => {
        this.handleTimerExpiration();
      });
    }
    this.code = this.sharedCodeService.getCode();

  }

  loadQuiz(quizId: number, candidateId: number): void {
    this.quizService.getQuizById(quizId).subscribe(
      (quiz: Quiz) => {
        this.quiz = quiz;
        this.questionnaires = quiz.questionnaires || [];
        console.log('Quiz récupéré :', this.quiz);
        console.log('Questionnaires récupérés :', this.questionnaires);
        const qcmIds: number[] = [];
        if (quiz.qcMs) {
          quiz.qcMs.forEach((qcm: any) => {
            qcmIds.push(qcm.qcmId);
          });
        }
        console.log('IDs des QCMs récupérés :', qcmIds);
        this.loadQcmQuestionsDetails(qcmIds);
        this.candidateId = candidateId;
        this.quizId= quizId;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du quiz:', error);
      }
    );
  }/*
  loadQcmQuestionsDetails(qcmId: number[]): void {
    const url = `http://localhost:5159/api/QCM/QuestionsAndOptions/${qcmId.join(',')}`;
    this.http.get<any[]>(url).subscribe(
      (qcmQuestions: any[]) => {
        console.log('QCM récupéré :', qcmQuestions);
        // Convertir l'objet qcmQuestions en un tableau
        qcmQuestions = Object.values(qcmQuestions);
        this.qcmQuestions = qcmQuestions.map(qcmQuestion => ({
          ...qcmQuestion,
          this:qcmQuestions = qcmQuestions,
          question: Object.values(qcmQuestion.question)
        }));
      },
      (error) => {
        console.error('Erreur lors du chargement des questions du QCM:', error);
      }
    );
  }*/
    loadQcmQuestionsDetails(qcmIds: number[]): void {
      const url = `http://localhost:5159/api/QCM/QuestionsAndOptions/${qcmIds.join(',')}`;
      this.http.get<any[]>(url).subscribe(
        (qcmQuestions: any[]) => {
          console.log('QCM récupéré :', qcmQuestions);
          // Convertir l'objet qcmQuestions en un tableau
          qcmQuestions = Object.values(qcmQuestions);
          this.qcmQuestions = qcmQuestions.map(qcmQuestion => ({
            ...qcmQuestion,
            question: Array.isArray(qcmQuestion.question) ? qcmQuestion.question : [qcmQuestion.question]  // S'assurer que question est un tableau
          }));
        },
        (error) => {
          console.error('Erreur lors du chargement des questions du QCM:', error);
        }
      );
    }
    

  
  

  /*submitQuiz(): void {
    this.timerStopped = true;

    this.router.navigate(['/merci'], { queryParams: { candidatId: this.candidateId } });
    const lastCode = this.sharedCodeService.getCode();
    console.log(lastCode);
    const reponseCandidat: ReponseCandidat = {
      optionId: [],
      reponseQuestionnaire: lastCode,
      candidatId: this.candidateId,
      quizId : this.quizId
    };

    this.qcmQuestions.forEach(qcmQuestion => {
      qcmQuestion.question.forEach(question => {
        const selectedOptions = question.option.filter((option: Option) => option.selected);
        if (selectedOptions.length > 0) {
          const optionIds = selectedOptions.map((option: Option) => option.optionId);
          reponseCandidat.optionId.push(...optionIds);
        }
      });
    });

    console.log('Réponse du candidat :', reponseCandidat);

    this.reponseService.saveReponse(reponseCandidat).subscribe(
      (response) => {
        this.calculateScore(reponseCandidat);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la réponse:', error);
      }
    );
  }*/
    handleCodeSubmitted(code: string) {
      // Capturer le code soumis par IdecomponentComponent
      this.codeFromIDE = code;
    }
    submitQuiz(): void {
      // Arrêter le timer en définissant la variable timerStopped sur true
      this.timerStopped = true;


      console.log(this.codeFromIDE);
      // Ne pas afficher la notification du temps écoulé lorsque le timer est arrêté
      
        this.router.navigate(['/merci'], { queryParams: { candidatId: this.candidateId } });   
        const reponseCandidat: ReponseCandidat = {
          optionId: [],
       
          reponseQuestionnaire: this.codeFromIDE,
          candidatId: this.candidateId,
          quizId: this.quizId
        };
    
        this.qcmQuestions.forEach(qcmQuestion => {
          qcmQuestion.question.forEach(question => {
            const selectedOptions = question.option.filter((option: Option) => option.selected);
            if (selectedOptions.length > 0) {
              const optionIds = selectedOptions.map((option: Option) => option.optionId);
              reponseCandidat.optionId.push(...optionIds);
            }
          });
        });
    
        console.log('Réponse du candidat :', reponseCandidat);
    
        this.reponseService.saveReponse(reponseCandidat).subscribe(
          (response) => {
            this.calculateScore(reponseCandidat);
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement de la réponse:', error);
          }
        );
      
    }
    

  calculateScore(reponseCandidat: ReponseCandidat): void {
    this.reponseService.calculateScore(reponseCandidat).subscribe(
      (score: number) => {
        console.log('Score calculé avec succès:', score);
        this.score = score;
        this.generatePDFReport(this.candidateId);
      },
      (error) => {
        console.error('Erreur lors du calcul du score:', error);
      }
    );
  }

  generatePDFReport(candidatId: number): void {
    this.reponseService.genererPdfReponsesCandidat(candidatId).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'reponses_candidat.pdf';
        link.click();
      },
      (error) => {
        console.error('Erreur lors de la génération du rapport PDF:', error);
      }
    );
  }

  selectOption(optionId: number, questionId: number): void {
    const qcmQuestion = this.qcmQuestions.find(qcmQuestion => qcmQuestion.questionId === questionId);
    if (qcmQuestion) {
      const question = qcmQuestion.question.find(question => question.questionId === questionId);
      if (question) {
        const option = question.option.find(option => option.optionId === optionId);
        if (option) {
          option.selected = !option.selected;
        }
      }
    }
  }

  handleTimerExpiration(): void {
    this.submitQuiz();
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }
}
