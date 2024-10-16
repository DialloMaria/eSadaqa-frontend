import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { DonModel } from '../Models/Don.model';
import { apiUrl } from './apiUrl';
import { AuthService } from './auth.Service';
import { DonEvolution } from '../Models/DonEvolution.model';

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
  // addDon(don: DonModel): Observable<DonModel> {
  //   const token = localStorage.getItem('access_token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.post<DonModel>(`${apiUrl}/don/ajout`, don ,{ headers });
  // }

  addDon(donData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Pas de typage avec DonModel ici
    return this.http.post<DonModel>(`${apiUrl}/don/ajout`, donData, { headers });
  }



  // Modifier un don
// Méthode pour mettre à jour un don avec FormData
// updateDon(id: number, donData: FormData): Observable<DonModel> {
//   const token = localStorage.getItem('access_token');
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//   return this.http.put<DonModel>(`${apiUrl}/don/modification/${id}`, donData, { headers });
// }
updateDon(id: number, donData: FormData): Observable<DonModel> {

  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post<DonModel>(`${apiUrl}/don/modification/${id}`, donData, { headers });
}


  // Récupérer un don par ID
  getDonById(id: number): Observable<DonModel> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<DonModel>(`${apiUrl}/don/${id}`, { headers }).pipe(
      tap(data=> console.log('Données récupérées:', data)), // Log de la réponse
      catchError(error => {
        console.error('Erreur lors de la récupération des données:', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour récupérer les dons publiés à une date donnée
  getDonsByDate(date: string): Observable<{ data: DonModel[] }> {
    const params = new HttpParams().set('date', date);
    return this.http.get<{ data: DonModel[] }>(`${apiUrl}/dons/by-date`, { params });
  }

  // Méthode pour récupérer l'évolution des dons
  getDonsEvolution(): Observable<DonEvolution[]> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<DonEvolution[]>(`${apiUrl}/evolution`); // Assurez-vous que l'URL est correcte
  }

  // Supprimer un don
  // deleteDon(id: number, token: string): Observable<void> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.delete<void>(`${apiUrl}/delete/${id}`, { headers });
  // }
}
