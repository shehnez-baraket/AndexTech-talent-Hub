import { Component, OnInit } from '@angular/core';
import { AvisClient } from '../models/AvisClient';
import { AvisClientService } from '../Services/AvisClientService';

@Component({
  selector: 'app-avis-candidat',
  templateUrl: './avis-candidat.component.html',
  styleUrls: ['./avis-candidat.component.css']
})
export class AvisCandidatComponent implements OnInit {
  avisClients: AvisClient[] = [];

  constructor(private avisService: AvisClientService) {}

  ngOnInit(): void {
    this.avisService.getAvis().subscribe(data => {
      this.avisClients = data;
    });
  }
}