import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.Service';
import { NotificationService } from '../../../Services/notification.service';
import { ReservationService } from '../../../Services/reservation.Service';

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


  constructor(private notificationService: NotificationService, private authService: AuthService,private reservationservice:ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
    this.donateurId = this.authService.getDonateurId();

  }

    // Fetches the reservations from the server
    // fetchReservations(): void {
    //   this.notificationService.getReservationByBeneficiare().subscribe({
    //     next: (data) => {
    //       // Filter out confirmed reservations from the fetched data
    //       this.reservations = data.filter((reservation: any) => reservation.don.status !== 'confirme');
    //       console.log('Réservations:', this.reservations);
    //     },
    //     error: (error) => {
    //       console.error('Erreur lors de la récupération des réservations:', error);
    //     },
    //   });
    // }
    fetchReservations() {
      this.reservationservice.getReservationByBeneficiare().subscribe(
        (data: any) => {
          console.log('Réponse de l\'API:', data); // Vérifier le contenu de la réponse
          this.reservations = data.reservations;
        },
        (error) => {
          console.error('Erreur lors de la récupération des réservations:', error);
        }
      );
    }

}

