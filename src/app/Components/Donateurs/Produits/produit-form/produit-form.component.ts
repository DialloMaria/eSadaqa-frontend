import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitService } from '../../../../Services/produit.Service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProduitModel } from '../../../../Models/TypeProduit.model';

@Component({
  selector: 'app-produit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produit-form.component.html',
  styleUrl: './produit-form.component.css'
})
export class ProduitFormComponent {
  produitForm: FormGroup;
  isEditMode = false;
  produitId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.produitForm = this.fb.group({
      libelle: ['', Validators.required],
      quantite: [null, Validators.required],
      montant: [null],
      modePaiement: [''],
      don_id: [null] // Ajoutez une validation si nécessaire
    });
  }

  ngOnInit(): void {
    // Vérifie si nous sommes en mode modification
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.produitId = +id; // Convertit l'ID en nombre
        this.loadProduitData(this.produitId);
      }
    });
  }

  // Charge les données du produit si en mode modification
  loadProduitData(id: number): void {
    this.produitService.getProduit(id).subscribe((produit: ProduitModel) => {
      this.produitForm.patchValue({
        libelle: produit.libelle,
        quantite: produit.quantite,
        montant: produit.montant,
        modePaiement: produit.modePaiement,
        don_id: produit.don_id
      });
    });
  }

  // Soumission du formulaire
  submit(): void {
    if (this.produitForm.valid) {
      const produitData: ProduitModel = this.produitForm.value;

      if (this.isEditMode && this.produitId) {
        // Met à jour le produit
        this.produitService.updateProduit(this.produitId, produitData).subscribe({
          next: () => {
            console.log('Produit modifié avec succès');
            this.router.navigate(['/produits']);
          },
          error: (err) => {
            console.error('Erreur lors de la modification du produit', err);
          }
        });
      } else {
        // Ajoute un nouveau produit
        this.produitService.createProduit(produitData).subscribe({
          next: () => {
            console.log('Produit ajouté avec succès');
            this.router.navigate(['/produits']);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout du produit', err);
          }
        });
      }
    }
  }
}

      // editProduit(produit: ProduitModel): void {
    //   this.isEditMode = true;
    //   this.currentProduitId = produit.id;
    //   this.ProduitForm.patchValue(produit);
    // }
