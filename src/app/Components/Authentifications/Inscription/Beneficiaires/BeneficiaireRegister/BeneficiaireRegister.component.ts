import { AuthService } from '../../../../../Services/auth.Service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../../../../Models/User.model';
import { DonateurModel } from '../../../../../Models/Donateur.model';
import { OrganisationModel } from '../../../../../Models/Organiation.model';
import { BeneficiaireModel } from '../../../../../Models/Beneficiaire.model';

@Component({
  selector: 'app-inscription-daara',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './BeneficiaireRegister.component.html',
  styleUrl: './BeneficiaireRegister.component.css'
})
export class RegisterBeneficiaireComponent {
  BeneficiaireRegister: FormGroup;
  isEditMode = false;
  currentStep: number = 1;
  selectedFile: File | null = null;
  selectedRecepisse: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.BeneficiaireRegister = this.fb.group({
      // Step 1 fields
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),  Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),  Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, this.phoneValidator, Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
      confimationMDP: ['', Validators.required],
      photo_profile: [null, Validators.required],

      nomstructure: ['', Validators.required],
      telstructure: ['', Validators.required],
      emailstructure: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      fondateur: [ Validators.required],
      siege: ['', Validators.required],
      logo: [''],
      date_creation: [''],
      recepisse: [''],
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confimationMDP')?.value
      ? null
      : { mismatch: true };
  }

        // Fonction de validation personnalisée
        phoneValidator(control: AbstractControl): ValidationErrors | null {
          const phoneNumber = control.value;

          if (!phoneNumber) {
            return null; // Si le champ est vide, laisser Validators.required gérer cette erreur
          }

          const errors: any = {};

          // Vérifier si le téléphone commence par "7"
          if (phoneNumber[0] !== '7') {
            errors.mustStartWith7 = true;
          }

          // Vérifier si le téléphone contient exactement 9 chiffres
          if (phoneNumber.length !== 9) {
            errors.invalidLength = true;
          }

          // Si des erreurs ont été trouvées, retourner l'objet d'erreurs
          return Object.keys(errors).length ? errors : null;
        }


          // Fonction de validation personnalisée pour le mot de passe
          passwordValidator(control: AbstractControl): ValidationErrors | null {
            const password = control.value;
            const errors: any = {};

            if (!password) {
              return null; // Si le champ est vide, laisser Validators.required gérer cette erreur
            }

            // Vérifier la présence d'une lettre majuscule
            const uppercasePattern = /[A-Z]/;
            if (!uppercasePattern.test(password)) {
              errors.uppercase = true;
            }

            // Vérifier la présence d'un chiffre
            const numberPattern = /[0-9]/;
            if (!numberPattern.test(password)) {
              errors.number = true;
            }

            return Object.keys(errors).length ? errors : null;
          }

  nextStep() {
    if(this.BeneficiaireRegister.controls['nom'].valid &&
      this.BeneficiaireRegister.controls['prenom'].valid &&
      this.BeneficiaireRegister.controls['email'].valid &&
      this.BeneficiaireRegister.controls['adresse'].valid &&
      this.BeneficiaireRegister.controls['telephone'].valid &&
      this.BeneficiaireRegister.controls['photo_profile'].valid &&
      this.BeneficiaireRegister.controls['password'].valid)  {
      this.currentStep = 2;
    } else {
      this.BeneficiaireRegister.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  previousStep() {
    this.currentStep = 1;
  }
  // Gestion de la sélection de fichiers
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.BeneficiaireRegister.patchValue({
        photo_profile: this.selectedFile
      });
    }
  }

  onRecepisseSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedRecepisse = input.files[0];
      this.BeneficiaireRegister.patchValue({
        recepisse: this.selectedRecepisse,
      });
    }
  }


  // Soumission du formulaire
  submit(): void {

      if (this.BeneficiaireRegister.valid) {
        const user: BeneficiaireModel = this.BeneficiaireRegister.value;
       

        // Ajoute un nouveau produit
        this.authService.registerBeneficiaire(user).subscribe({
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
