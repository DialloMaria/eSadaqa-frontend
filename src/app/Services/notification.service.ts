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


  // Récupérer les réservations
  getReservations(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${apiUrl}/reservation/affichage`, { headers });
  }

  // Confirmer une réservation
  confirmReservation(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${apiUrl}/reservations/${id}/confirm`, {}, { headers });
  }
}
