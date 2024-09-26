import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DonModel } from '../Models/Don.model';
import { apiUrl } from './apiUrl';
import { AuthService } from './auth.Service';

@Injectable({
  providedIn: 'root',
})
export class DonService {

  constructor(private http: HttpClient , private authService: AuthService) {}

  // Récupérer tous les dons
  // getDons(token: string): Observable<DonModel[]> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.get<DonModel[]>(`${apiUrl}/affichage`, { headers });
  // }

  // Méthode pour récupérer les dons avec le token JWT
  getDons(): Observable<{ message: string; data: DonModel[] }> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ message: string; data: DonModel[] }>(`${apiUrl}/don/affichage`, { headers });
}


  // Supprime un don
  deleteDon(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${apiUrl}/don/suppression/${id}`, { headers });
  }
  // Ajouter un nouveau don
  addDon(don: DonModel): Observable<DonModel> {
    return this.http.post<DonModel>(`${apiUrl}/donateur/`, don);
  }

  // Récupérer un don par ID
  getDonById(id: number): Observable<DonModel> {
    return this.http.get<DonModel>(`${apiUrl}/${id}`);
  }

  // Modifier un don
  updateDon(id: number, don: DonModel): Observable<DonModel> {
    return this.http.put<DonModel>(`${apiUrl}/${id}`, don);
  }

  // Supprimer un don
  // deleteDon(id: number, token: string): Observable<void> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.delete<void>(`${apiUrl}/delete/${id}`, { headers });
  // }
}
