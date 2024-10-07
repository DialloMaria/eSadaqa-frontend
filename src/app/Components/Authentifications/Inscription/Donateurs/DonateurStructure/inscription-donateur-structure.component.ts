import { AuthService } from '../../../../../Services/auth.Service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../../../../Models/User.model';
import { DonateurModel } from '../../../../../Models/Donateur.model';

@Component({
  selector: 'app-donateur-structure',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscription-donateur-structure.component.html',
  styleUrl: './inscription-donateur-structure.component.css'
})
export class InscriptionDonateurStructureComponent {
  InscriptionStructureForm: FormGroup;
  isEditMode = false;
  currentStep: number = 1;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.InscriptionStructureForm = this.fb.group({
      // Step 1 fields
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

      // Step 2 fields
      nomstructure: ['', Validators.required],
      emailstructure: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      typestructure: ['micro', Validators.required],
      siege: ['', Validators.required],
      logo: ['', Validators.required],
      date_creation: ['', Validators.required],
      recepisse: ['', Validators.required],
    });
  }

  nextStep() {
    if (this.InscriptionStructureForm.controls['nom'].valid &&
        this.InscriptionStructureForm.controls['prenom'].valid &&
        this.InscriptionStructureForm.controls['email'].valid &&
        this.InscriptionStructureForm.controls['adresse'].valid &&
        this.InscriptionStructureForm.controls['telephone'].valid &&
        this.InscriptionStructureForm.controls['password'].valid) {
      this.currentStep = 2;
    } else {
      this.InscriptionStructureForm.markAllAsTouched();
    }
  }

  previousStep() {
    this.currentStep = 1;
  }

  submit() {
    if (this.InscriptionStructureForm.valid) {
      const formData = this.InscriptionStructureForm.value;
      this.authService.registerdonateurStructure(formData).subscribe({
        next: () => {
          console.log('Structure ajoutée avec succès');
          this.router.navigate(['/connexion']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de la structure', err);
        }
      });
    } else {
      this.InscriptionStructureForm.markAllAsTouched();
    }
  }

      // editProduit(produit: ProduitModel): void {
    //   this.isEditMode = true;
    //   this.currentProduitId = produit.id;
    //   this.InscriptionPersoForm.patchValue(produit);
    // }
}
