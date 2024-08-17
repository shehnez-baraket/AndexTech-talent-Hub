import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatService } from '../../Services/CandidatService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-candidat',
  templateUrl: './ajouter-candidat.component.html',
  styleUrls: ['./ajouter-candidat.component.css']
})
export class AjouterCandidatComponent implements OnInit {
  candidatForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private candidatService: CandidatService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.candidatForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresseEmail: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    const candidat = this.candidatForm.getRawValue();
    if (this.candidatForm.invalid) {
      this.snackBar.open('Formulaire non valide', 'Fermer', { duration: 3000 });
      return;
    }
    console.log(candidat);

    this.candidatService.ajouterCandidat(candidat)
      .subscribe(() => {
        this.snackBar.open('Candidat ajouté avec succès', 'Fermer', { duration: 3000 });
        this.router.navigate(['/tableauBord/listeCandidat']);
      });
  }
}
