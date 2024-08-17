import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer-component',
  templateUrl: './timer-component.component.html',
  styleUrls: ['./timer-component.component.css']
})
export class TimerComponentComponent implements OnInit {
  @Input() startTime: number = 10; // temps initial en secondes
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  intervalId: any;
  blinkEnabled: boolean = false; // Ajoutez une variable pour activer/désactiver le clignotement
  @Output() timerExpired: EventEmitter<void> = new EventEmitter<void>(); // Ajoutez un EventEmitter pour détecter l'expiration du timer

  constructor(private snackBar: MatSnackBar, private router:Router) {}

  ngOnInit(): void {
    this.startTimer();
    this.hours = Math.floor(this.startTime / 3600);
    this.minutes = Math.floor((this.startTime % 3600) / 60);
    this.seconds = this.startTime % 60;
  }

  startTimer() {
  this.intervalId = setInterval(() => {
    if (this.seconds > 0) {
      this.seconds--;
    } else {
      if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        if (this.hours > 0) {
          this.hours--;
          this.minutes = 59;
          this.seconds = 59;
        } else {
          clearInterval(this.intervalId);
          this.showNotification();
          this.timerExpired.emit(); // Émettre un événement lorsque le timer expire

        }
      }
    }
    
    // Mettre à jour blinkEnabled en fonction de minutes
    this.blinkEnabled = this.hours === 0 && this.minutes <= 5;
  }, 1000);
}


  stopTimer() {
    clearInterval(this.intervalId);
  }

  showNotification() {
    this.snackBar.open('Le temps est écoulé!', 'Fermer', {
      duration: 5000, // Durée de la notification en millisecondes
      verticalPosition: 'top'// Afficher la notification en haut de la page
    });
    this.stopTimer(); // Arrêter le minuteur lorsque la notification est affichée
    this.router.navigate(['/merci']);

  }
}