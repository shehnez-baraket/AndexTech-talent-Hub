import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/Question';

@Component({
  selector: 'app-qcm',
  templateUrl: './qcm.component.html',
  styleUrls: ['./qcm.component.css']
})
export class QCMComponent {
  @Input() question!: Question;

  toggleOption(optionId: number, event: any): void {
    const option = this.question.option.find(opt => opt.optionId === optionId);
    if (option) {
      option.selected = event.target.checked;
    }
  }
}
