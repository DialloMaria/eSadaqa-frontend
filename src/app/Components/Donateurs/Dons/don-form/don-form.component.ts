import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DonService } from '../../../../Services/don.Services';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DonModel } from '../../../../Models/Don.model';
import { ProduitModel } from '../../../../Models/TypeProduit.model';
import { ProduitService } from '../../../../Services/produit.Service';
import { ValidatorData } from '../../../Validator';

@Component({
  selector: 'app-don-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Ajout de ReactiveFormsModule ici
  templateUrl: './don-form.component.html',
  styleUrls: ['./don-form.component.css'] // Correction ici pour `styleUrls`
})
export class DonFormComponent {
  donForm!: FormGroup;
  isEditMode = false;
  produitForm!: FormGroup;
  showProduitForm = false; // Variable pour contrôler l'affichage du formulaire de produit
  produits: ProduitModel[] = []; // Liste des produits ajoutés
  selectedImage: File | null = null; // Pour stocker le fichier d'image sélectionné


  constructor(
    private fb: FormBuilder,
    private donService: DonService,
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.donForm = this.fb.group({
      libelle: ['', [
        ValidatorData.requiredValidator('Libellé'),
        ValidatorData.checkValidOnlyLetterOrNumber, 
        ValidatorData.minLengthValidator('Libellé', 3),
        ValidatorData.maxLengthValidator('Libellé', 50)
      ]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      lieuReception: ['', [Validators.required, Validators.maxLength(150)]],
      categorie: ['', [Validators.required, Validators.maxLength(50)]],
      adresse: ['', [Validators.required, Validators.maxLength(200)]],
      image: ['']
    });

    this.produitForm = this.fb.group({
      libelle: ['', Validators.required],
      quantite: [null, Validators.required]
    });
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type.startsWith('image/')) { // Vérifie si le fichier est une image
        this.selectedImage = file; // Stocke le fichier sélectionné
      } else {
        alert('Veuillez sélectionner un fichier image valide.');
        this.selectedImage = null;
      }
    } else {
      this.selectedImage = null; // Réinitialise si aucun fichier n'est sélectionné
    }
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
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    // Appel au service pour ajouter le don
    this.donService.addDon(formData).subscribe({
      next: (response) => {
        const donId = response.data.id;
        this.submitProduits(donId);
        window.location.reload();
        this.donForm.reset(); // Réinitialise le formulaire après l'ajout

        // this.router.navigate(['/demande']);
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

