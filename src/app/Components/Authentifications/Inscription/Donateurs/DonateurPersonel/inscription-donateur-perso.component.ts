import { AuthService } from '../../../../../Services/auth.Service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../../../../Models/User.model';
import { ValidatorCore } from '../../../../../Services/validator';
@Component({
  selector: 'app-donateur-perso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscription-donateur-perso.component.html',
  styleUrl: './inscription-donateur-perso.component.css'
})
export class InscriptionPersoComponent {
  InscriptionPersoForm: FormGroup;
  isEditMode = false;
  produitId: number | null = null;
  messageErreur: string = ''; // Message d'erreur
  showErrorMessage:string = ''; // Show

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.InscriptionPersoForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }




  // Soumission du formulaire
  submit(): void {
    if (this.InscriptionPersoForm.valid) {
      const produitData: UserModel = this.InscriptionPersoForm.value;

        // Ajoute un nouveau produit
        this.authService.registerPerso(produitData).subscribe({
          next: () => {
            console.log('Produit ajouté avec succès');
            this.router.navigate(['/connexion']);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout du produit', err);
          }
        });
      }
    }
  }


