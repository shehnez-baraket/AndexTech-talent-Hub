import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/AuthService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Importer Router

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  authForm: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router // Injecter Router
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.authForm.valid) {
      const email = this.authForm.get('email')?.value;
      const password = this.authForm.get('password')?.value;

      if (email && password) {
        this.loading = true;
        this.authService.login(email, password).subscribe(
          response => {
            console.log(response.message); // Connexion réussie
            // Afficher une notification de succès
            this.snackBar.open('Connexion réussie!', 'Fermer', {
              duration: 1000, // Durée d'affichage de la notification en ms
              panelClass: ['success-snackbar'], // Classe CSS pour personnaliser l'apparence de la notification
              verticalPosition: 'top', // Position verticale en haut
              horizontalPosition: 'center', // Position horizontale au centre
            });

            // Rediriger après un court délai pour permettre à l'utilisateur de voir la notification
            setTimeout(() => {
              this.router.navigate(['/tableauBord/listeCandidat']); // Rediriger vers la nouvelle route
            }, 3000);
          },
          error => {
            console.error(error); // Gérez l'erreur (Email ou mot de passe incorrect)
            this.loading = false;
            this.snackBar.open('Email ou mot de passe incorrect!', 'Fermer', {
              duration: 3000, // Durée d'affichage de la notification en ms
              panelClass: ['error-snackbar'], // Classe CSS pour personnaliser l'apparence de la notification
              verticalPosition: 'top', // Position verticale en haut
              horizontalPosition: 'center', // Position horizontale au centre
            });
          }
        );
      }
    }
  }
}
