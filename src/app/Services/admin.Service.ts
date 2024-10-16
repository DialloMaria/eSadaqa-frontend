import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { DonModel } from '../Models/Don.model';
import { apiUrl } from './apiUrl';
import { AuthService } from './auth.Service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  constructor(private http: HttpClient,private authService: AuthService ) {}


  // Méthode pour récupérer la liste des organisations
  getOrganisations(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`); // Remplace 'token' par la méthode utilisée pour stocker le token JWT ou autre
    return this.http.get<any>(`${apiUrl}/list/organisation`, { headers });

  }
}
