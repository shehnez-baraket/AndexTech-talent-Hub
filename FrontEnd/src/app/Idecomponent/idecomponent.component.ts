import { Component, OnInit, OnDestroy, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'codemirror/mode/clike/clike.js'; // Import C# mode
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import { Quiz } from '../models/Quiz';
import { Questionnaire } from '../models/Questionnaire';
import { TrackingService } from '../Services/TrackingService';
import { SharedCodeService } from '../Services/SharedCodeService';
import { last } from 'rxjs';

@Component({
  selector: 'app-idecomponent',
  templateUrl: './idecomponent.component.html',
  styleUrls: ['./idecomponent.component.css']
})

export class IdecomponentComponent implements OnInit, OnDestroy {
  @Input() candidateId!: number ;
  @Input() questionnaire!: Questionnaire;
  @Input () quizId! :number;
  @ViewChild('codeMirror') codeMirror: CodemirrorComponent | undefined;
  public code = 'using System;\n  public class Program\n {\npublic static void Main(string[] args) {int num1 = 5;\n int num2 = 10;\n int sum = AddNumbers(num1, num2);\nConsole.WriteLine("La somme de {0} et {1} est : {2}", num1, num2, sum);\n}\n \n public static int AddNumbers(int a, int b)\n {\nreturn a + b;\n}\n}\n';
  editorOptions = {
    mode: { name: 'text/x-csharp' }, // Set mode to C#
    lineNumbers: true,
    gutters: ['CodeMirror-lint-markers'],
    styleActiveLine: true,
    theme: 'monokai',
    extraKeys: { 'Ctrl-Space': 'autocomplete' },
    indentUnit: 2,
    tabSize: 4,
    autoFocus: true,
    autoClearEmptyLines: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
  };

  private trackingData: any[] = [];
  private copypasteEvents: any[] = [];
  private pasteEvents: any[] = [];
  private visibilityChangeHandler: (() => void) | undefined;
  private startTime!: number;
  private endTime: number | undefined;
  @Output() codeSubmitted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, 
    private http: HttpClient,
    private trackingService: TrackingService,    
    private sharedCodeService: SharedCodeService  // Inject the shared service

  ) {}

  ngOnInit(): void {
  
    this.visibilityChangeHandler = () => {
      if (document.visibilityState === 'visible') {
        console.log('L\'onglet est actif');
        this.startTime = performance.now(); // Enregistrer le temps lorsque l'onglet devient actif
        this.trackingData.push({ action: 'Tab active', timestamp: new Date() });
        const trackingEvent = { action: 'Tab active', timestamp: new Date(), candidatId: this.candidateId, 
          quizId: this.quizId };
        this.trackingService.addTrackingEvent(trackingEvent).subscribe(
          (response) => {
            console.log('Événement de suivi enregistré avec succès:', response);
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement de l\'événement de suivi:', error);
          }
        );
      } else {
        console.log('L\'onglet est inactif');
        this.endTime = performance.now(); // Enregistrer le temps lorsque l'onglet devient inactif
        this.trackingData.push({ action: 'Tab inactive', timestamp: new Date() });
        const trackingEvent = { action: 'Tab inactive', timestamp: new Date(), candidatId: this.candidateId, quizId: this.quizId };
        this.trackingService.addTrackingEvent(trackingEvent).subscribe(
          (response) => {
            console.log('Événement de suivi enregistré avec succès:', response);
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement de l\'événement de suivi:', error);
          }
        );
        // Calculer la durée entre l'activation et l'inactivation de l'onglet
        const duration = this.endTime - this.startTime;
        console.log('Durée d\'inactivité de l\'onglet (en millisecondes) :', duration);

        // Vous pouvez ensuite stocker cette durée dans votre tableau de suivi ou l'utiliser comme vous le souhaitez
        this.trackingData.push({ action: 'Tab inactive duration', duration: duration, timestamp: new Date() });
      }
      console.log(this.trackingData);
    };
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
    
    const codeEditor = document.querySelector('.code-editor');

    if (codeEditor) {
      codeEditor.addEventListener('copy', (event: Event) => {
        const copiedText = window.getSelection()?.toString(); // Récupérer le texte sélectionné
        console.log('Action de copier détectée');
        this.copypasteEvents.push({ action: 'Action de copier', content: copiedText, timestamp: new Date() });

        const trackingEvent = { action: 'Action de copier', content : copiedText, timestamp: new Date(), 
          candidatId: this.candidateId, quizId: this.quizId };
        this.trackingService.addCopyPasteEvent(trackingEvent).subscribe(
          (response) => {
            console.log('Événement de suivi enregistré avec succès:', response);
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement de l\'événement de suivi:', error);
          }
        );
        console.log(this.copypasteEvents);
      });

      codeEditor.addEventListener('paste', (event: Event) => {
        // Récupérer le texte collé
        const pastedText = (event as ClipboardEvent).clipboardData?.getData('text');
        console.log('Action de coller détectée');
        this.copypasteEvents.push({ action: 'Action de coller', content: pastedText, timestamp: new Date() });
        const trackingEvent = { action: 'Action de coller', content : pastedText, timestamp: new Date(),
           candidatId: this.candidateId,
          quizId:this.quizId };
        this.trackingService.addCopyPasteEvent(trackingEvent).subscribe(
          (response) => {
            console.log('Événement de suivi enregistré avec succès:', response);
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement de l\'événement de suivi:', error);
          }
        );
        console.log(this.copypasteEvents);
      });
    }

    // Afficher les données de suivi dans la console
    console.log('Données de suivi :', this.trackingData);
    console.log('Événements de copie coller :', this.copypasteEvents);
}



  ngOnDestroy(): void {
    if (this.visibilityChangeHandler) {
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
    }
  }

  onSubmit() {
    this.codeSubmitted.emit(this.code);
    const lastCode = this.codeMirror?.codeMirror?.getValue() || '';

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    this.http.post<any>('http://localhost:5159/api/code', { code: this.code }, { headers }).subscribe(
      (res) => {
        console.log('Résultat de l\'exécution du code :', res);
        const resultElement = document.querySelector('.result span');
        if (resultElement) {
          resultElement.textContent = res.ExecutionResult;
        }
        console.log(lastCode);
        this.sharedCodeService.setCode(lastCode);  // Set the code in the shared service

      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de l\'exécution du code :', error);
        const errorElement = document.querySelector('.result span');
        if (errorElement) {
          errorElement.textContent = error.message;
        }
      }
    );
  }


  onEditorInit(editor: any) {
    editor.on('change', () => {
      this.code = editor.getValue();
    });
  }

  onCodeChange(newCode: string) {
    this.code = newCode;
  }

  onNext() {
    this.router.navigate(['/qcm']);
  }
}
