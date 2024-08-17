import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/AdminService';
import { admin } from 'src/app/models/admin';
@Component({
  selector: 'app-modifier-admin',
  templateUrl: './modifier-admin.component.html',
  styleUrls: ['./modifier-admin.component.css']
})
export class ModifierAdminComponent implements OnInit {
  adminId!: number;
  admin!: admin;
  adminForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      this.adminId = +params['id'];
      this.getAdminById(this.adminId);
    });
  }

  initForm(): void {
    this.adminForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(8)]],

    });
  }

  getAdminById(id: number): void {
    this.adminService.getAdminById(this.adminId)
      .subscribe((admin: any) => {
        this.adminForm.patchValue({
          nom: admin.nom,
          prenom: admin.prenom,
          email: admin.email,
          phoneNumber: admin.phoneNumber

          // Mettez à jour avec d'autres champs d'administration si nécessaire
        });
      });
  }

  onSubmit(): void {
    if (this.adminForm.invalid) {
      return;
    }
    const admin = this.adminForm.getRawValue() as admin;
    console.log(admin);
  console.log(this.adminId);
    this.adminService.updateAdmin(this.adminId, admin)
      .subscribe(() => {
        this.snackBar.open('Administrateur modifié avec succès', 'Fermer', {
          duration: 3000
        });
        console.log(admin);
        this.router.navigate(['/tableauBord/listeAdmin']);
      });
  }
}