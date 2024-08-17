import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Route n'est pas nécessaire ici
import { AdminService } from 'src/app/Services/AdminService';
@Component({
  selector: 'app-ajouter-admin',
  templateUrl: './ajouter-admin.component.html',
  styleUrls: ['./ajouter-admin.component.css']
})
export class AjouterAdminComponent implements OnInit {
  adminForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, 
              private adminService: AdminService,
              private snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit(): void {
                this.initForm();
              }
  initForm(): void {

    this.adminForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      PasswordHash: ['', Validators.required]
    });
    
  }

  onSubmit(): void {
    if (this.adminForm.invalid) {
      this.snackBar.open('Formulaire invalide', 'Fermer', { duration: 3000 });
      return;
    }

    const admin = this.adminForm.value;

    // Vérifier si le champ de mot de passe est vide
    if (!admin.PasswordHash) {
      this.snackBar.open('Le champ de mot de passe est requis', 'Fermer', { duration: 3000 });
      return;
    }

    this.adminService.createAdmin(admin)
      .subscribe(
        () => {
          this.snackBar.open('Admin ajouté avec succès', 'Fermer', { duration: 3000 });
          this.router.navigate(['/tableauBord/listeAdmin']);
        },
        (error) => {
          if (error.error && error.error.message) {
            this.snackBar.open(error.error.message, 'Fermer', { duration: 3000 });
          } else {
            this.snackBar.open('Une erreur est survenue lors de l\'ajout de l\'admin', 'Fermer', { duration: 3000 });
          }
        }
      );
  }
}
