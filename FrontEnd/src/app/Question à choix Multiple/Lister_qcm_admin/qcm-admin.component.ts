import { Component, Injectable } from '@angular/core';
import { QCM } from '../../models/qcm';
import { QCMService } from '../../Services/QCMService';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-qcm-admin',
  templateUrl: './qcm-admin.component.html',
  styleUrls: ['./qcm-admin.component.css']
}) 
@Injectable({
    providedIn: 'root'
  })
export class QcmAdminComponent {
  niveaux: { [key: number]: string } = {
    0: 'Débutant',
    1: 'Intermédiaire',
    2: 'Expert'
  };
  constructor(private qcmService: QCMService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }


modifierQCM(_t16: QCM) {
  this.router.navigate(['/tableauBord/modifierQcm']);
}
qcms: any[] = [];

  

  ngOnInit(): void {
    this.getQCMs();
  }

  getQCMs(): void {
    this.qcmService.getQCMs()
    .subscribe((qcms: QCM[]) => {
      this.qcms = qcms; 
    });
  
  }
  getNiveauLabel(niveauId: number): string {
    return this.niveaux[niveauId] || 'Inconnu';
  }
  deleteQCM(id: number) {
    const snackBarRef = this.snackBar.open('Voulez-vous vraiment supprimer ce Qcm?', 'Oui', {
      duration: 5000, // Durée d'affichage du snackbar en millisecondes
      panelClass: ['custom-snackbar'] // Classe CSS personnalisée pour le snackbar
    });
    
    snackBarRef.onAction().subscribe(() => {
      const action = 'Oui'; // Ou tout autre texte de l'action du bouton "Oui"
      if (action === 'Oui') {
        this.qcmService.deleteQCM(id).subscribe(() => {
          this.getQCMs(); // Mettez à jour la liste des candidats après la suppression
        });
      }
    });
    

  }


}