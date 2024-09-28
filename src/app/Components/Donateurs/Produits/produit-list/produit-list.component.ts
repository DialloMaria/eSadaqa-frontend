import { Component, OnInit } from '@angular/core';
import { ProduitModel } from '../../../../Models/TypeProduit.model';
import { ProduitService } from '../../../../Services/produit.Service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produit-list.component.html',
  styleUrl: './produit-list.component.css'
})

  export class ProduitListComponent implements OnInit {
    ProduitForm!: FormGroup;
    produits: ProduitModel[] = [];
    isEditMode = false;
    currentProduitId: number | null = null;
    constructor(
      private produitService: ProduitService,
      private fb: FormBuilder,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.initializeForm();
      this.loadProduits();
    }

    initializeForm(): void {
      this.ProduitForm = this.fb.group({
        libelle: ['', Validators.required],
        quantite: [null, [Validators.required, Validators.min(1)]],
        montant: [null],
        modePaiement: [null],
        don_id: [null]
      });
    }
  //   loadProduits(): void {
  //     this.produitService.getProduits().subscribe(
  //       (response) => {
  //         this.produits = response.data; // Assurez-vous de récupérer le tableau depuis la clé 'data'
  //       },
  //       (error) => {
  //         if (error.status === 401) {
  //           console.error('Non autorisé - Vérifiez votre authentification.');
  //         } else {
  //           console.error('Erreur lors du chargement des produits:', error);
  //         }
  //       }
  //     );
  //  }

   loadProduits(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
        this.produitService.getProduits().subscribe(
            (response: any) => { // Change le type en 'any' temporairement
                console.log('Dons récupérés:', response);
                if (Array.isArray(response.data)) {
                    this.produits = response.data; // Accède au tableau
                } else {
                    console.error('Erreur: les dons récupérés ne sont pas un tableau', response.data);
                    this.produits = []; // Assure-toi que dons est un tableau
                }
            },
            (error) => {
                if (error.status === 401) {
                    alert('Session expirée. Veuillez vous reconnecter.');
                    this.router.navigate(['/connexion']);
                } else {
                    console.error('Erreur lors de la récupération des dons:', error);
                }
            }
        );
    } else {
        alert('Vous devez être connecté pour voir cette page.');
        this.router.navigate(['/connexion']);
    }
}

    submit(): void {
      if (this.ProduitForm.valid) {
        const produitData = this.ProduitForm.value;

        if (this.isEditMode && this.currentProduitId !== null) {
          this.produitService.updateProduit(this.currentProduitId, produitData).subscribe(() => {
            this.loadProduits();
            this.resetForm();
          });
        } else {
          this.produitService.createProduit(produitData).subscribe(() => {
            this.loadProduits();
            this.resetForm();
          });
        }
      }
    }

    deleteProduit(id?: number): void {
      const token = localStorage.getItem('access_token'); // Utilisation cohérente de 'access_token'
      if (id !== undefined && token) {
        this.produitService.deleteProduit(id).subscribe(
          () => {
            this.loadProduits(); // Recharge la liste après la suppression
          },
          (error) => {
            console.error('Erreur lors de la suppression du don:', error);
          }
        );
      } else {
        console.error('Token non trouvé ou ID invalide.');
      }
    }

    editProduit(produit: ProduitModel): void {
      this.isEditMode = true;
      this.currentProduitId = produit.id;
      this.ProduitForm.patchValue(produit);
    }

    // deleteProduit(id: number): void {
    //   this.produitService.deleteProduit(id).subscribe(() => {
    //     this.loadProduits();
    //   });
    // }

    resetForm(): void {
      this.ProduitForm.reset();
      this.isEditMode = false;
      this.currentProduitId = null;
    }
  }

