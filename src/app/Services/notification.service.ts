import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { AuthService } from './auth.Service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Récupérer les réservations par donateur
  getReservations(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${apiUrl}/reservation/affichageByDonateur`, { headers }); // Mettez à jour cette route selon votre API
  }

  getReservationByBeneficiare(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${apiUrl}/reservation/affichageByBeneficiaire`, { headers }); // Mettez à jour cette route selon votre API
  }


  // Récupérer les réservations
  // getReservations(): Observable<any> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.get<any>(`${apiUrl}/reservation/affichage`, { headers });
  // }

  // Confirmer une réservation
  confirmReservation(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${apiUrl}/reservations/${id}/confirm`, {}, { headers });
  }

    // Méthode pour créer une réservation
    createReservation(reservationData: any): Observable<any> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<any>(`${apiUrl}/reservations`, reservationData, { headers });
    }

    // Méthode pour envoyer une notification au donateur
    sendNotification(donateurId: number, message: string): Observable<any> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<any>(`${apiUrl}/notifications`, {
        donateurId,
        message,
      },
      { headers });
    }
}
