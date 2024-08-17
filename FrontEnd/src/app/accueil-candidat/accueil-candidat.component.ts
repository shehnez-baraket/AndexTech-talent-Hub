import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../Services/QuizService';

@Component({
  selector: 'app-accueil-candidat',
  templateUrl: './accueil-candidat.component.html',
  styleUrls: ['./accueil-candidat.component.css']
})
export class AccueilCandidatComponent implements OnInit {
  token: string = '';

  constructor(private route: ActivatedRoute, 
    private router: Router,
  private quizService: QuizService) { }

  ngOnInit(): void {
    // Récupérer le token de l'URL
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token') || '';
     
    });
  }
  
  lancerTest() {
    // Naviguer vers l'interface du quiz avec le token inclus dans le chemin de la route
    this.router.navigate(['/quiz', this.token]);
  }

  contactRH() {
    window.open('mailto:sbarket@aiventu.com', '_blank');
  }
}
