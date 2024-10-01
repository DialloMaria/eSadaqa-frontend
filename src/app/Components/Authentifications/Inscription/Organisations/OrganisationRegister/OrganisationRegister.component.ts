import { AuthService } from '../../../../../Services/auth.Service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../../../../Models/User.model';
import { DonateurModel } from '../../../../../Models/Donateur.model';
import { OrganisationModel } from '../../../../../Models/Organiation.model';

@Component({
  selector: 'app-produit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './OrganisationRegister.component.html',
  styleUrl: './OrganisationRegister.component.css'
})
export class RegisterOrganisationComponent {
  OrganisationRegister: FormGroup;
  isEditMode = false;
  currentStep: number = 1;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.OrganisationRegister = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nomstructure: ['', Validators.required],
      typestructure: ['', Validators.required],
      emailstructure: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      fondateur: [ Validators.required],
      siege: ['', Validators.required],
      logo: [''],
      date_creation: [''],
      recepisse: [''],
    });
  }


  nextStep() {
    if (this.OrganisationRegister.valid) {
      this.currentStep = 2;
    } else {
      this.OrganisationRegister.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  previousStep() {
    this.currentStep = 1;
  }


  // Soumission du formulaire
  submit(): void {

      if (this.OrganisationRegister.valid) {
        const produitData: OrganisationModel = this.OrganisationRegister.value;

        // Ajoute un nouveau produit
        this.authService.registerOrganisation(produitData).subscribe({
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
