import { Component } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  reservations: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.notificationService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        console.log('Réservations:', this.reservations); // Affichez pour vérifier la structure
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des réservations:', error);
      },
    });
  }

  confirmReservation(id: number): void {
    if (!id) {
      alert('ID de réservation manquant.');
      return;
    }

    this.notificationService.confirmReservation(id).subscribe({
      next: (response) => {
        alert(response.message); // Affichez le message de confirmation
        this.fetchReservations(); // Rafraîchir la liste après confirmation
      },
      error: (error) => {
        console.error('Erreur lors de la confirmation de la réservation:', error);
        alert('Erreur lors de la confirmation.');
      },
    });
  }
}

