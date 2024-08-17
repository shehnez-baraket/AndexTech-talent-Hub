import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/Services/AdminService';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  changePassword() {
    this.adminService.changePassword(this.data.userId, this.oldPassword, this.newPassword).subscribe(
      response => {
        this.snackBar.open('Mot de passe changé avec succès', 'Fermer', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      error => {
        this.snackBar.open('Erreur lors du changement de mot de passe', 'Fermer', {
          duration: 3000,
        });
        this.dialogRef.close(false);
      }
    );
  }
}
