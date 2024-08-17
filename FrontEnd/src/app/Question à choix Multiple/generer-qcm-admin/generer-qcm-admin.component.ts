import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QCMService } from 'src/app/Services/QCMService';

@Component({
  selector: 'app-generer-qcm-admin',
  templateUrl: './generer-qcm-admin.component.html',
  styleUrls: ['./generer-qcm-admin.component.css']
})
export class GenererQcmAdminComponent implements OnInit {
  qcmForm!: FormGroup;
  niveaux = [
    { value: 0, label: 'Débutant' },
    { value: 1, label: 'Intermédiaire' },
    { value: 2, label: 'Expert' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private qcmService: QCMService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.qcmForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      nombreQuestions: [null, [Validators.required, Validators.min(1)]],
      niveauId: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.qcmForm.invalid) {
      return;
    }

    this.qcmService.createQCM(this.qcmForm.value).subscribe(
      () => { 
        this.snackBar.open('QCM créé avec succès', 'Fermer', {duration: 3000 });
        this.router.navigate(['tableauBord/listeQcm']);
      },
      error => {
        this.snackBar.open('Erreur lors de la création du QCM', 'Fermer', {
          duration: 3000
        });
        console.log(this.qcmForm.value);
        console.error('Erreur lors de la création du QCM:', error);
      }
    );
  }
}