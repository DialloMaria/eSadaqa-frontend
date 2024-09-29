import { AuthService } from './auth.Service';
import { Injectable, inject } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { apiUrl } from "./apiUrl";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProduitModel } from "../Models/TypeProduit.model";

@Injectable({
  providedIn: 'root',
})

export class ProduitService  {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}


    // Ajouter un produit à un don
    // addProduit(produit: ProduitModel): Observable<ProduitModel> {
    //   return this.http.post<ProduitModel>(`${apiUrl}`, produit);
    // // }
    addProduit(produit: ProduitModel): Observable<ProduitModel> {
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter l'en-tête d'autorisation

      return this.http.post<ProduitModel>(`${apiUrl}/produit/ajout`, produit, { headers }); // Inclure les headers dans la requête
    }


    // // Récupérer tous les produits d'un don spécifique
    // getProduitsByDonId(donId: number): Observable<ProduitModel> {
    //   return this.http.get<ProduitModel>(`${apiUrl}/don/${donId}`);
    // }

    // // Mettre à jour un produit existant
    // updateProduit(id: number, produit: ProduitModel): Observable<ProduitModel> {
    //   return this.http.put<ProduitModel>(`${apiUrl}/${id}`, produit);
    // }

    // // Supprimer un produit
    // deleteProduit(id: number): Observable<ProduitModel> {
    //   return this.http.delete<ProduitModel>(`${apiUrl}/${id}`);
    // }


    // getProduits(): Observable<ProduitModel[]> {
    //   const token = localStorage.getItem('access_token');
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    //   return this.http.get<ProduitModel[]>(`${apiUrl}/produit/affichage`);
    // }

    getProduits(): Observable<ProduitModel[]> {
      const token = localStorage.getItem('access_token'); // Récupérer le jeton d'accès depuis le stockage local
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter l'en-tête d'autorisation

      return this.http.get<ProduitModel[]>(`${apiUrl}/produit/affichage`, { headers }); // Inclure les headers dans la requête
    }

    getProduit(id: number): Observable<ProduitModel> {
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.http.get<ProduitModel>(`${apiUrl}/${id}`);
    }


      // Récupérer un don par ID
    //   getProduitById(id: number): Observable<ProduitModel> {
    //   const token = this.authService.getToken();
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    //   return this.http.get<ProduitModel>(`${apiUrl}/produit/${id}`, { headers }).pipe(
    //     tap(data=> console.log('Données récupérées:', data)), // Log de la réponse
    //     catchError(error => {
    //       console.error('Erreur lors de la récupération des données:', error);
    //       return throwError(error);
    //     })
    //   );
    // }

    getProduitsByDonId(donId: number): Observable<ProduitModel[]> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.http.get<ProduitModel[]>(`${apiUrl}/dons/${donId}/produits`, { headers }).pipe(
        tap(data => console.log('Produits récupérés:', data)),
        catchError(error => {
          console.error('Erreur lors de la récupération des produits:', error);
          return throwError(error);
        })
      );
    }

      // Créer un produit
      createProduit(produit: any): Observable<ProduitModel> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter l'en-tête d'autorisation

        return this.http.post<ProduitModel>(`${apiUrl}/produit/ajout`, produit, { headers }); // Inclure les headers dans la requête
      }

    updateProduit(id: number, produit: ProduitModel): Observable<ProduitModel> {
      return this.http.put<ProduitModel>(`${apiUrl}/${id}`, produit);
    }


    deleteProduit(id: number): Observable<void> {
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.http.delete<void>(`${apiUrl}/produit/suppression/${id}`, { headers });
    }

    // deleteProduit(id: number): Observable<void> {
    //   const token = localStorage.getItem('access_token');
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    //   return this.http.delete<void>(`${apiUrl}/produit/suppression/${id}`, { headers }); // Ajoutez ici les headers
    // }



}
