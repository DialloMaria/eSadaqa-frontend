import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiUrl } from "./apiUrl";
import { Observable, throwError } from "rxjs";
import { AuthService } from "./auth.Service";

@Injectable({
  providedIn: 'root',
})

export class ReservationService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}




    // Méthode pour créer une réservation
  createReservation(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    return this.http.post(`${apiUrl}/reservation/ajout`, data, { headers });
  }

  // Récupérer les bénéficiaires
  // getBeneficiaires(): Observable<any> {
  //   return this.http.get(`${apiUrl}/listbeneficiaires`);
  // }

  // // Récupérer les dons
  // getDons(): Observable<any> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.get(`${apiUrl}/don/affichage`,{ headers });
  // }
  getBeneficiaires(): Observable<any> {
    const token = localStorage.getItem('access_token'); // Assurez-vous que c'est le bon nom
    if (!token) {
      console.error('Token d\'authentification manquant.');
      return throwError('Token d\'authentification manquant.'); // Ou une valeur par défaut
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${apiUrl}/listbeneficiaires`, { headers });
  }

  // getDons(): Observable<any> {
  //   const token = localStorage.getItem('token'); // Récupération du token
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.get(`${apiUrl}/don/affichage`, { headers });
  // }

  // getDons(token: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.get(`${apiUrl}/don/affichage`, { headers });
  // }

  getDons(): Observable<any> {
    const token = localStorage.getItem('access_token'); // Assurez-vous que c'est le bon nom
    if (!token) {
      console.error('Token d\'authentification manquant.');
      return throwError('Token d\'authentification manquant.'); // Ou une valeur par défaut
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${apiUrl}/don/affichage`, { headers });
}
}
