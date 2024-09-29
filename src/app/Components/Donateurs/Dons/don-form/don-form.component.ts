import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DonService } from '../../../../Services/don.Services';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DonModel } from '../../../../Models/Don.model';
import { ProduitModel } from '../../../../Models/TypeProduit.model';
import { ProduitService } from '../../../../Services/produit.Service';

@Component({
  selector: 'app-don-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Ajout de ReactiveFormsModule ici
  templateUrl: './don-form.component.html',
  styleUrls: ['./don-form.component.css'] // Correction ici pour `styleUrls`
})
export class DonFormComponent {
  donForm: FormGroup;
  isEditMode = false;
  produitForm: FormGroup;
  showProduitForm = false; // Variable pour contrôler l'affichage du formulaire de produit
  produits: ProduitModel[] = []; // Liste des produits ajoutés

  constructor(
    private fb: FormBuilder,
    private donService: DonService,
    private produitService: ProduitService,
    private router: Router
  ) {
    this.donForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      lieuReception: ['', Validators.required],
      categorie: ['', Validators.required],
      adresse: ['', Validators.required],
      image: ['']
    });

    this.produitForm = this.fb.group({
      libelle: ['', Validators.required],
      quantite: [null, Validators.required]
    });
  }

  submitDon(): void {
    if (this.donForm.invalid || this.produits.length === 0) {
      alert('Veuillez ajouter au moins un produit.');
      return;
    }

    // Créer un objet FormData pour l'envoi du don avec ses données
    const formData = new FormData();
    formData.append('libelle', this.donForm.get('libelle')?.value);
    formData.append('description', this.donForm.get('description')?.value);
    formData.append('lieuReception', this.donForm.get('lieuReception')?.value);
    formData.append('categorie', this.donForm.get('categorie')?.value);
    formData.append('adresse', this.donForm.get('adresse')?.value);

    // Vérifier si une image est présente
    const imageValue = this.donForm.get('image')?.value;
    if (imageValue) {
      formData.append('image', imageValue); // Assurez-vous que c'est un fichier ou une URL valide
    }

    this.donService.addDon(formData).subscribe({
      next: (response) => {
        const donId = response.data.id;
        this.submitProduits(donId);
        this.router.navigate(['/dons']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du don', err);
      }
    });
  }

  addProduit(): void {
    if (this.produitForm.valid) {
      const produitData: ProduitModel = this.produitForm.value;
      this.produits.push(produitData); // Ajoute le produit à la liste
      this.produitForm.reset(); // Réinitialise le formulaire après l'ajout
    }
  }

  submitProduits(donId: number): void {
    this.produits.forEach((produit) => {
      produit.don_id = donId;
      this.produitService.createProduit(produit).subscribe({
        next: () => console.log('Produit ajouté avec succès'),
        error: (err) => console.error('Erreur lors de l\'ajout du produit', err)
      });
    });
  }
}

