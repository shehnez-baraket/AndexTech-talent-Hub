import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CandidatService } from './Services/CandidatService';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
@Injectable({
  providedIn: 'root'
})
export class CandidatResolverService implements Resolve<any> {
  constructor(private candidatService: CandidatService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.candidatService.getCandidatById(Number(id));
  }
}
// Import du CandidatResolverService
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { IdecomponentComponent } from './Idecomponent/idecomponent.component';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { TimerComponentComponent } from './Chrono/timer-component.component';
import { Routes, RouterModule } from '@angular/router';
import { QCMComponent } from './QCM/qcm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { QuestionsSqlComponent } from './SQL/questions-sql.component';
import { HttpClientModule } from '@angular/common/http';
import { MerciComponent } from './Remerciement/merci.component';
import { AuthentificationComponent } from './Authentification/authentification.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidateListComponent } from './Candidat/Lister_Candidats/Lister_CandidatsComponent';
import { ModifierCandidatComponent } from './Candidat/modifier-candidat/modifier-candidat.component';
import { AjouterCandidatComponent } from './Candidat/ajouter-candidat/ajouter-candidat.component';
import { QcmAdminComponent } from './Question à choix Multiple/Lister_qcm_admin/qcm-admin.component';
import { ModifierQcmComponent } from './Question à choix Multiple/modifier_qcm/modifier-qcm.component';
import { ListerQuestionsAdminComponent } from './Questions/lister-questions-admin/lister-questions-admin.component';
import { ModifierQuestionsAdminComponent } from './Questions/modifier-questions-admin/modifier-questions-admin.component';
import { ListerAdminsComponent } from './Admin/lister-admins/lister-admins.component';
import { AjouterAdminComponent } from './Admin/ajouter-admin/ajouter-admin.component';
import { ListerQuestionnairesComponent } from './Questionnaire/lister-questionnaires/lister-questionnaires.component';
import { ModifierQuestionnaireComponent } from './Questionnaire/modifier-questionnaire/modifier-questionnaire.component';
import { AjouterQuestionnaireComponent } from './Questionnaire/ajouter-questionnaire/ajouter-questionnaire.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Correct import
import { AdaptativeQcmComponent } from './adaptative-qcm/adaptative-qcm.component';
import { AccueilCandidatComponent } from './accueil-candidat/accueil-candidat.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { ModifierAdminComponent } from './Admin/modifier-admin/modifier-admin.component';
import { AjouterQuestionAdminComponent } from './Questions/ajouter-question-admin/ajouter-question-admin.component';
import { ChangePasswordComponent } from './Admin/change-password/change-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminService } from './Services/AdminService';
import { GenererQcmAdminComponent } from './Question à choix Multiple/generer-qcm-admin/generer-qcm-admin.component';
import { ListeQuizComponent } from './Quiz/liste-quiz/liste-quiz.component';
import { GenererQuizComponent } from './Quiz/generer-quiz/generer-quiz.component';
import { CandidateSelectionDialogComponent } from './Quiz/candidate-selection-dialog/candidate-selection-dialog.component';
import { RemerciementLienUtiliseComponent } from './remerciement-lien-utilise/remerciement-lien-utilise.component';
import { FeedbackDialogComponent } from './Candidat/feedback-dialog/feedback-dialog.component';
import { ListerFeedbacksComponent } from './Feedbacks/lister-feedbacks/lister-feedbacks.component';
import { ModifierFeedbackComponent } from './Feedbacks/modifier-feedback/modifier-feedback.component';
import { MatChipsModule } from '@angular/material/chips';
import { ListQuizParCandidatComponent } from './Candidat/list-quiz-par-candidat/list-quiz-par-candidat.component';
import { AvisCandidatComponent } from './avis-candidat/avis-candidat.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


// Routes
const routes: Routes = [
  { path: 'ide', component: IdecomponentComponent },
  { path: 'qcm', component: QCMComponent },
  { path: 'questions-sql', component: QuestionsSqlComponent },
  { path: 'merci', component: MerciComponent },
  { path: 'modifierCandidat/:id', component: ModifierCandidatComponent},
  { path: 'authentification', component: AuthentificationComponent},
  { path: 'listeCandidat', component: CandidateListComponent},
  { path: 'timer', component: TimerComponentComponent},
  { path: 'qcmAdmin', component: QcmAdminComponent},
  { path: 'modifierQcm', component: ModifierQcmComponent},
  { path: 'ListeQuestion', component: ListerQuestionsAdminComponent},
  { path: 'modifierQuestion/:id', component: ModifierQuestionsAdminComponent},
  { path: 'ajoutAdmin', component: AjouterAdminComponent},
  { path: 'ListeQuestionnaire', component: ListerQuestionnairesComponent},
  { path: 'modifierQuestionnaire/:id', component: ModifierQuestionnaireComponent},
  { path: 'ajoutQuestionnaire', component: AjouterQuestionnaireComponent},
  { path: 'accueil/:token', component: AccueilCandidatComponent},
  { path: 'quiz/:token', component: AdaptativeQcmComponent },
  { path: 'listeAdmin', component:ListerAdminsComponent},
  { path: 'modifierAdmin/:id', component: ModifierAdminComponent },
  { path: 'ajoutCandidat', component: AjouterCandidatComponent },
  { path: 'ajoutQuestion', component: AjouterQuestionAdminComponent },
  {path :'remerciement', component:RemerciementLienUtiliseComponent},
  {path :'avisCandidat', component:AvisCandidatComponent},
  {path :'stat', component:StatistiquesComponent},


  {
    path: 'tableauBord',
    component: TableauDeBordComponent,
    children: [
      { path: '', redirectTo: 'stat', pathMatch: 'full' }, 
      { path: 'ajoutAdmin', component: AjouterAdminComponent },
      { path: 'listeAdmin', component: ListerAdminsComponent },
      { path: 'modifierAdmin/:id', component: ModifierAdminComponent },
      { path: 'listeCandidat', component: CandidateListComponent },
      { path: 'ajoutCandidat', component: AjouterCandidatComponent },
      { path: 'modifierCandidat/:id', component: ModifierCandidatComponent },
      { path: 'listeQuestion', component: ListerQuestionsAdminComponent },
      { path: 'ajoutQuestion', component: AjouterQuestionAdminComponent },
      { path: 'modifierQuestion/:id', component: ModifierQuestionsAdminComponent },
      { path: 'listeQuestionnaire', component: ListerQuestionnairesComponent },
      { path: 'ajoutQuestionnaire', component: AjouterQuestionnaireComponent },
      { path: 'modifierQuestionnaire/:id', component: ModifierQuestionnaireComponent },
      { path: 'listeQcm', component: QcmAdminComponent },
      { path: 'modifierQcm', component: ModifierQcmComponent },
      { path: 'genererQcm', component: GenererQcmAdminComponent },
      { path: 'listeQuiz', component: ListeQuizComponent },
      { path: 'genererQuiz', component: GenererQuizComponent },
      { path: 'listeFeedback', component: ListerFeedbacksComponent },
      { path: 'modifierFeedback/:id', component: ModifierFeedbackComponent },
      {path :'avisCandidat', component:AvisCandidatComponent},
      {path :'stat', component:StatistiquesComponent},




    ]
  },

];

@NgModule({
  declarations: [
    AppComponent,
    IdecomponentComponent,
    TimerComponentComponent,
    QCMComponent,
    QuestionsSqlComponent,
    MerciComponent,
    AuthentificationComponent,
    CandidateListComponent,
    ModifierCandidatComponent,
    AjouterCandidatComponent,
    QcmAdminComponent,
    ModifierQcmComponent,
    ListerQuestionsAdminComponent,
    ModifierQuestionsAdminComponent,
    ListerAdminsComponent,
    ListerQuestionnairesComponent,
    AjouterQuestionnaireComponent,
    AdaptativeQcmComponent,
    AccueilCandidatComponent,
    TableauDeBordComponent,
    AjouterAdminComponent,
    ModifierAdminComponent,
    AjouterQuestionAdminComponent,
    ModifierQuestionnaireComponent,
    ChangePasswordComponent,
    GenererQcmAdminComponent,
    ListeQuizComponent,
    GenererQuizComponent,
    CandidateSelectionDialogComponent,
    RemerciementLienUtiliseComponent,
    FeedbackDialogComponent,
    ListerFeedbacksComponent,
    ModifierFeedbackComponent,
    ListQuizParCandidatComponent,
    AvisCandidatComponent,
    StatistiquesComponent
   


  ],
  imports: [
    MatChipsModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,   
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CodemirrorModule,
    ToastNotificationsModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    NgxChartsModule,
   
   ],
 
  bootstrap: [AppComponent],
  providers: [AdminService,
    CandidatResolverService
  ],

  entryComponents: [ChangePasswordComponent]
})
export class AppModule { }