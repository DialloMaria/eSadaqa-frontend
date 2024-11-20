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
export class BeneficiaireService {

  constructor(private http: HttpClient , private authService: AuthService) {}

  getDonsByBeneficiaire(): Observable<{ message: string; data: DonModel[] }> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ message: string; data: DonModel[] }>(`${apiUrl}/don/beneficiaire`, { headers });
}
}
