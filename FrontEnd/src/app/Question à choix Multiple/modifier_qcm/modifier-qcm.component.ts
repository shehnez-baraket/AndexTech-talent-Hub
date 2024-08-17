import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QCM } from '../../models/qcm';
import { QCMService } from '../../Services/QCMService';

@Component({
  selector: 'app-modifier-qcm',
  templateUrl: './modifier-qcm.component.html',
  styleUrls: ['./modifier-qcm.component.css']
})
export class ModifierQcmComponent implements OnInit {
  qcmForm!: FormGroup;
  qcm!: QCM;

  constructor(private formBuilder: FormBuilder, private qcmService: QCMService) { }

  ngOnInit(): void {
    this.initForm();
    // Récupérer le QCM à modifier
    // this.qcmService.getQCM(id).subscribe(qcm => {
    //   this.qcm = qcm;
    //   this.initForm();
    // });
  }

  initForm(): void {
    this.qcmForm = this.formBuilder.group({
      titre: [''],
      description: [''],
      questions: this.formBuilder.array([])
    });
  }

  get questions(): FormArray {
    return this.qcmForm.get('questions') as FormArray;
  }

  onSubmit(): void {
    // Mettre à jour le QCM avec les valeurs du formulaire
    // this.qcmService.updateQCM(this.qcm.id, this.qcmForm.value).subscribe(() => {
    //   // Rediriger ou afficher un message de succès
    // });
  }

  onAnnuler(): void {
    // Rediriger ou effectuer d'autres actions en cas d'annulation
  }
}