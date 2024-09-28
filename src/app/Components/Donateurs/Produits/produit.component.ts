import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitModel } from '../../../Models/TypeProduit.model';
import { ProduitService } from '../../../Services/produit.Service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {
  ProduitForm!: FormGroup;
  produits: ProduitModel[] = [];
  isEditMode = false;
  currentProduitId: number | null = null;

  constructor(private fb: FormBuilder, private produitService: ProduitService) {}

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

  loadProduits(): void {
    this.produitService.getProduits().subscribe((data) => {
      this.produits = data;
    });
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

  editProduit(produit: ProduitModel): void {
    this.isEditMode = true;
    this.currentProduitId = produit.id;
    this.ProduitForm.patchValue(produit);
  }

  deleteProduit(id: number): void {
    this.produitService.deleteProduit(id).subscribe(() => {
      this.loadProduits();
    });
  }

  resetForm(): void {
    this.ProduitForm.reset();
    this.isEditMode = false;
    this.currentProduitId = null;
  }
}
