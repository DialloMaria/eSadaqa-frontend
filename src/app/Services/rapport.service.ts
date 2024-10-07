import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl'; // Chemin correct vers votre fichier apiUrl

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  constructor(private http: HttpClient) { }

  // Appel API pour générer le rapport
  generateRapport(reservation_id:number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // L'interceptor ajoute déjà l'en-tête Authorization

    return this.http.post<any>(`${apiUrl}/generate-rapport/`, {reservation_id} , {headers});

  }
}
