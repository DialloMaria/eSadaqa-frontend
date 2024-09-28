// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Inject, Injectable } from "@angular/core"
// import { DonateurModel } from "../Models/Donateur.model";
// import { OrganisationModel } from "../Models/Organiation.model";
// import { BeneficiaireModel } from "../Models/Beneficiaire.model";
// import { Observable } from "rxjs";
// import { apiUrl } from "./apiUrl";

// @Injectable(
//   {
//     providedIn: 'root',
//   }
// )
// export class AuthService {
//   // private http = Inject(HttpClient);

//   constructor(private http: HttpClient) { }

//   //Methode pour l'INSCRIPTION
//   registerDonateur(donateur: DonateurModel): Observable<any> {
//     return this.http.post(`${apiUrl}/register/donateur`, donateur);
//   }

//   registerOrganisation(organisation: OrganisationModel): Observable<any> {
//     return this.http.post(`${apiUrl}/register/organisation`, organisation);
//   }

//   registerBeneficiaire(beneficiaire: BeneficiaireModel): Observable<any> {
//     return this.http.post(`${apiUrl}/register/beneficiaire`, beneficiaire);
//   }

//   //Methode pour la CONNEXION
//   login(identifiant: any)  {
//     return this.http.post(`${apiUrl}/login`, identifiant)
//   }

//   //Methode pour la DECONNEXION
//   logout() {
//     const token = localStorage.getItem('access_token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${apiUrl}/logout`, { headers });
//   }


//   //Methode pour acceder au TOKEN


// }


// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private http = inject(HttpClient);

//   // private apiUrl = 'http://127.0.0.1:8000/api/'; // Remplacez par l'URL appropriée

//   constructor(private http: HttpClient) {}

//   registerUser(userData: any): Observable<any> {
//     return this.http.post(this.apiUrl, userData);
//   }

//   //   //Methode pour la CONNEXION
//   login(identifiant: any)  {
//     return this.http.post(`${apiUrl}/login`, identifiant)
//   }
// }



import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { apiUrl } from "./apiUrl";
import { Observable } from "rxjs";

@Injectable ({
  providedIn: 'root'

})

export class AuthService{
  // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);
  @Injectable({
    providedIn: 'root'
  })


  // Decaration des methods

    // method to login
  // Requête POST pour l'authentification
  login(userObject: { email: string; password: string }): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${apiUrl}/login`, userObject);
  }

  // Méthode pour récupérer le token
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // method to register
  register(identifiant: any) {
    return this.http.post(`${apiUrl}/register`, identifiant)
  }

  registerUser(identifiant: any) {
    return this.http.post(`${apiUrl}/register/admin`, identifiant)
  }


  // getSpecialisations(): Observable<DomaineModel[]> {
  //   return this.http.get<DomaineModel[]>(`${apiUrl}/domaines`);
  // }


 // Method to logout
 logout() {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${apiUrl}/logout`, { headers });
}
}
