import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/AdminService';
import { admin } from 'src/app/models/admin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lister-admins',
  templateUrl: './lister-admins.component.html',
  styleUrls: ['./lister-admins.component.css']
})
export class ListerAdminsComponent implements OnInit {
  admins!: admin[];

  constructor(private adminService: AdminService, 
    private router: Router,
    private snackBar: MatSnackBar, 
    private dialog: MatDialog // Injection de MatDialog

  ) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): void {
    this.adminService.getAdmins().subscribe(admins => this.admins = admins);
  }
  editAdmin(id: number): void {
    this.router.navigate(['/tableauBord/modifierAdmin', id]);
  }

 
  deleteAdmin(id: number) {
    const snackBarRef = this.snackBar.open('Voulez-vous vraiment supprimer ce candidat?', 'Oui', {
      duration: 5000, // Durée d'affichage du snackbar en millisecondes
      panelClass: ['custom-snackbar'] // Classe CSS personnalisée pour le snackbar
    });
    
    snackBarRef.onAction().subscribe(() => {
      const action = 'Oui'; 
      if (action === 'Oui') {
        this.adminService.deleteAdmin(id).subscribe(() => {
          this.getAdmins(); 
        });
      }
    });
  }
  openChangePassword(userId: number): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if needed
      }
    });
  }
}