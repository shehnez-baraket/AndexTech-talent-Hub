import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { AvisClientService } from '../Services/AvisClientService';
import { ReponseService } from '../Services/ReponseService';
import { QuestionService } from '../Services/QuestionService';
import { QCMService } from '../Services/QCMService';
import { QuizService } from '../Services/QuizService';
import { CandidatService } from '../Services/CandidatService';
import { QuestionnaireService } from '../Services/Questionnaire';


@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  reponses65Plus: number = 0;
  reponses85Plus: number = 0;
  totalQCMs: number = 0;
  totalQuestionnaires: number = 0;
  totalQuizzes: number = 0;
  totalCandidates: number = 0;
  highScoreQuizzes: number = 0;
  highCorrectAnswersQuestions: number = 0;
  totalQuestions: number = 0;
  view: [number, number] = [400, 300]; // Ajuster la taille des graphiques ici
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Étoiles';
  yAxisLabel = 'Nombre';

  // Définition du schéma de couleur
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#00214F', '#F6E211', '#E7E6E6']
  };
  
  data: any[] = [];
  barData: any[] = [];
  pieData: any[] = [];

  constructor(
    private avisClientService: AvisClientService,
    private reponseService: ReponseService,
    private questionService: QuestionService,
    private questionnaireService: QuestionnaireService,
    private qcmService: QCMService,
    private quizService: QuizService,
    private candidatService: CandidatService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchStatistiques();
    this.fetchCountReponsesByScore();
    this.fetchStatistiquesCount();
  }

  fetchCountReponsesByScore(): void {
    this.reponseService.getStatsScoreCandidats().subscribe(
      (result: any) => {
        console.log('Pie Data received:', result); 
        this.reponses65Plus = result.above68Percent; // Utilisez les noms de clés corrects en camelCase
        this.reponses85Plus = result.below40Percent; // Utilisez les noms de clés corrects en camelCase
  
        this.pieData = [
          { name: '> 68%', value: result.above68Percent },
          { name: '< 40%', value: result.below40Percent }
        ];
  
        console.log('Updated Pie Data:', this.pieData); 
        this.changeDetectorRef.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching count of responses by score:', error);
      }
    );
  }
  
  

  fetchStatistiques(): void {
    this.avisClientService.getAvisCountByStars().subscribe(
      (statistiques: any[]) => {
        console.log('Raw Data:', statistiques);
  
        this.barData = statistiques.map(item => ({
          name: `${item.name} étoile(s)`,
          value: item.value
        }));
  
        console.log('Updated Bar Data:', this.barData);
        this.changeDetectorRef.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching avis count by stars:', error);
      }
    );
  }
  
  fetchStatistiquesCount(): void {
    this.candidatService.getTotalCandidatsCount().subscribe(count => {
      this.totalCandidates = count;
      this.updateChartData();
    });
    
    this.questionService.getTotalQuestionCount().subscribe(count => {
      this.totalQuestions = count;
      this.updateChartData();
    });

    this.questionnaireService.getTotalQuestionnaireCount().subscribe((count: number) => {
      this.totalQuestionnaires = count;
      this.updateChartData();
    });

    this.qcmService.getTotalQcmCount().subscribe(count => {
      this.totalQCMs = count;
      this.updateChartData();
    });

    this.quizService.getTotalQuizCount().subscribe(count => {
      this.totalQuizzes = count;
      this.updateChartData();
    });
  }

  updateChartData(): void {
    this.data = [
      { name: 'Total Questions', value: this.totalQuestions },
      { name: 'Total Questionnaires', value: this.totalQuestionnaires },
      { name: 'Total QCMs', value: this.totalQCMs },
      { name: 'Total Quizzes', value: this.totalQuizzes },
      { name: 'Total Candidats', value: this.totalCandidates }
    ];
    console.log('Updated Bar Data:', this.data); 
    this.changeDetectorRef.detectChanges();
  }
}
