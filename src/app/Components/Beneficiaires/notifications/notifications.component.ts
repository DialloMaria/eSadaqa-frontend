import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.Service';
import { NotificationService } from '../../../Services/notification.service';

@Component({
  selector: 'app-notification-beneficiaire',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsBeneficiaireComponent {
  reservations: any[] = [];
  don:any[] = [];
  donateurId: number | null = null;
reservation: any;


  constructor(private notificationService: NotificationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchReservations();
    this.donateurId = this.authService.getDonateurId();

  }

    // Fetches the reservations from the server
    fetchReservations(): void {
      this.notificationService.getReservationByBeneficiare().subscribe({
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


}

