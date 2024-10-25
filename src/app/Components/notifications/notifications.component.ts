import { Component } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.Service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  reservations: any[] = [];
  don:any[] = [];
  donateurId: number | null = null;
reservation: any;


  constructor(private notificationService: NotificationService, private authService: AuthService ) {}

  ngOnInit(): void {
    this.fetchReservations();
    this.donateurId = this.authService.getDonateurId();

  }


    // Fetches the reservations from the server
    fetchReservations(): void {
      this.notificationService.getReservations().subscribe({
        next: (data) => {
          // Filter out confirmed reservations from the fetched data
          this.reservations = data.filter((reservation: any) => reservation.don.status !== 'confirme');
          console.log('Réservations:', this.reservations);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des réservations:', error);
        },
      });
    }
    
    // Dans votre composant TypeScript


  confirmReservation(id: number): void {
    if (!id) {
      alert('ID de réservation manquant.');
      return;
    }

    this.notificationService.confirmReservation(id).subscribe({
      next: (response) => {
        alert(response.message); // Affichez le message de confirmation

        // Mettre à jour la liste des réservations après confirmation
        this.reservations = this.reservations.filter(reservation => reservation.id !== id);
      },
      error: (error) => {
        console.error('Erreur lors de la confirmation de la réservation:', error);
        alert('Erreur lors de la confirmation.');
      },
    });
  }

  createReservation(reservationData: any): void {
    this.notificationService.createReservation(reservationData).subscribe({
      next: (response) => {
        alert('Réservation créée avec succès.');

        // Envoi d'une notification au donateur
        if (this.donateurId) {
          const message = `Une nouvelle réservation a été créée pour le don ${reservationData.donId}.`;
          this.notificationService.sendNotification(this.donateurId, message).subscribe({
            next: () => {
              console.log('Notification envoyée au donateur.');
            },
            error: (error) => {
              console.error('Erreur lors de l\'envoi de la notification au donateur:', error);
            },
          });
        }
      },
      error: (error) => {
        console.error('Erreur lors de la création de la réservation:', error);
        alert('Erreur lors de la création de la réservation.');
      },
    });
  }
}

