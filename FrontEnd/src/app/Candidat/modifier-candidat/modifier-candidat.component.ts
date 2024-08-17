import { Component, OnInit } from '@angular/core';
import { CandidatService } from '../../Services/CandidatService'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Candidat } from '../../models/Candidat';


@Component({
  selector: 'app-modifier-candidat',
  templateUrl: './modifier-candidat.component.html',
  styleUrls: ['./modifier-candidat.component.css']
})
export class ModifierCandidatComponent implements OnInit {
onAnnule() {
  this.initForm();
  this.route.params.subscribe(params => {
    this.candidatId = +params['id'];
    this.getCandidatById(this.candidatId);
  });}

  candidatForm!: FormGroup;
  candidatId!: number;
  constructor(
    private formBuilder: FormBuilder,
    private candidatService: CandidatService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      this.candidatId = +params['id'];
      this.getCandidatById(this.candidatId);
    });
  }

  initForm(): void {
    this.candidatForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresseEmail: ['', [Validators.required, Validators.email]],

    });
  }

  getCandidatById(id: number): void {
    this.candidatService.getCandidatById(id)
      .subscribe((candidat: any) => {
        this.candidatForm.patchValue({
          nom: candidat.nom,
          prenom: candidat.prenom,
          adresseEmail: candidat.adresseEmail
        });
      });
  }

onSubmit(): void {
  if (this.candidatForm.invalid) {
    return;
  }
  const candidat = this.candidatForm.getRawValue() as Candidat;
  
  this.candidatService.modifierCandidat(this.candidatId, candidat)
    .subscribe(() => {
      this.snackBar.open('Candidat modifié avec succès', 'Fermer', {
        duration: 3000
      });
      console.log(candidat);
      this.router.navigate(['/tableauBord/listeCandidat']);
    });
}

}
