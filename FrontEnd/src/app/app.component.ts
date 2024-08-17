import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AndexTech';
  showImage = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });
  }
 
    checkRoute() {
      const hideLogoRoutes = [
       
        '/tableauBord',
        '/tableauBord/listeAdmin',
        '/tableauBord/ajoutAdmin',
        '/tableauBord/modifierAdmin/',
        '/listeCandidat',
        '/ListeQuestion',
        '/ListeQuestionnaire',
        '/qcmAdmin',
        '/gestionQuiz',
        '/gestionFeedbacks',
        
       
      ];
      this.showImage = !hideLogoRoutes.some(route => this.router.url.startsWith(route));
    }
  


  isThankYouRouteActive(): boolean {
    return this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'merci';
  }



}

