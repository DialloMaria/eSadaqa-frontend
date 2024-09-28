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
  produitForm!: FormGroup;
  imageFile: File | null = null;
  donId: number | null = null; // ID du don à modifier, si disponible
  isEditMode = false; // Vérifie si nous sommes en mode modification


  constructor(
     private fb: FormBuilder,
     private donService: DonService,
     private route: ActivatedRoute, // Pour obtenir l'ID de l'URL
     private router: Router ,// Pour la redirection après soumission
     private http: HttpClient,
     private produitService: ProduitService, // Pour la gestion des produits
    )

    {
    this.donForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      image: [null], // le contrôle de l'image
      lieuReception: ['', Validators.required],
      categorie: ['', Validators.required],
      adresse: ['', Validators.required],

    });

    this.produitForm = this.fb.group({
      libelle: ['', Validators.required],
      quantite: [null, Validators.required],
    });

  }

  // Fonction pour gérer le changement de fichier
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  ngOnInit(): void {
    // Récupère l'ID du don depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.donId = +id; // Convertit l'ID en nombre
        this.loadDonData(this.donId);
      }
    });
  }

  // Charge les données actuelles du don à modifier
  loadDonData(id: number): void {
    this.donService.getDonById(id).subscribe((don: DonModel) => {
      // Pré-remplit le formulaire avec les données existantes
      this.donForm.patchValue({
        libelle: don.libelle,
        description: don.description,
        // lieuReception: don.lieuReception,
        categorie: don.categorie,
        adresse: don.adresse,
        image: don.image, // Si vous gérez une URL d'image
      });
    });
  }
  submit(): void {
    if (this.donForm.valid) {
      const formData = new FormData();

      // Ajoute les autres champs du formulaire
      formData.append('libelle', this.donForm.get('libelle')?.value);
      formData.append('description', this.donForm.get('description')?.value);
      formData.append('lieuReception', this.donForm.get('lieuReception')?.value);
      formData.append('categorie', this.donForm.get('categorie')?.value);
      formData.append('adresse', this.donForm.get('adresse')?.value);
      formData.append('image', this.donForm.get('image')?.value);

      // Ajoute l'image si elle est sélectionnée
      // if (this.imageFile) {
      //   formData.append('image', this.imageFile);
      // }

            // Vérifie si nous sommes en mode ajout ou modification
            if (this.isEditMode && this.donId) {
              // Mode modification : Appel de la méthode updateDon
              this.donService.updateDon(this.donId, formData).subscribe({
                next: (response) => {
                  console.log('Don modifié avec succès', response);
                  this.router.navigate(['/dons']); // Redirige après modification
                },
                error: (err) => {
                  console.error('Erreur lors de la modification du don', err);
                }
              });
            } else {
              // Mode ajout
              this.donService.addDon(formData).subscribe({
                next: (response) => {
                  console.log('Don ajouté avec succès', response);
                  this.submitProduit(response.data.id);
                  this.router.navigate(['/dons']); // Redirige après ajout
                },
                error: (err) => {
                  console.error('Erreur lors de l\'ajout du don', err);
                }
              });


      // Appel du service pour ajouter le don
      this.donService.addDon(formData).subscribe({
        next: (response) => {
          console.log('Don créé avec succès', response);
          // Réinitialise le formulaire ou effectue d'autres actions après la soumission
          this.donForm.reset();
        },
        error: (err) => {
          console.error('Erreur lors de la création du don', err);
        }
      });
    }
  }
}
submitProduit(don_id:number): void {
  if (this.produitForm.valid) {
    let produitData: ProduitModel = this.produitForm.value;
    produitData.don_id = don_id
    // const produitData = {
    //   libelle: this.produitForm.get('libelle')?.value,
    //   quantite: this.produitForm.get('quantite')?.value,
    //   don_id: don_id,
    // }
      // Ajoute un nouveau produit
      this.produitService.createProduit(produitData).subscribe({
        next: () => {
          console.log('Produit ajouté avec succès');
          // this.router.navigate(['/produits']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du produit', err);
        }
      });
    }
  }
}

