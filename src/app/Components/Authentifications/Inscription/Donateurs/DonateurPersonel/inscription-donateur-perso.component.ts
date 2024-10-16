import { AuthService } from '../../../../../Services/auth.Service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  styleUrls: ['./inscription-donateur-perso.component.css'] // Corrigé de styleUrl à styleUrls
})
export class InscriptionPersoComponent {
  InscriptionPersoForm: FormGroup;
  messageErreur: string = '';
  showErrorMessage: string = '';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.InscriptionPersoForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),  Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/), noThreeConsecutiveLetters()]],
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),  Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, this.phoneValidator, Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
      confimationMDP: ['', Validators.required],
      photo_profile: [null] // Modifié pour le formulaire réactif
    }, {
      validator: this.passwordMatchValidator
    });
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


  // Gestion de la sélection de fichiers
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.InscriptionPersoForm.patchValue({
        photo_profile: this.selectedFile // Mettre à jour le contrôle du formulaire
      });
    }
  }

  // Soumission du formulaire
  submit(): void {
    if (this.InscriptionPersoForm.valid && this.selectedFile) {
      const formData = new FormData();
      Object.keys(this.InscriptionPersoForm.value).forEach(key => {
        formData.append(key, this.InscriptionPersoForm.get(key)?.value);
      });
      formData.append('photo_profile', this.selectedFile);

      // Appel à l'API d'inscription
      this.authService.registerPerso(formData).subscribe({
        next: () => {
          console.log('Inscription réussie');
          this.router.navigate(['/connexion']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'inscription', err);
          this.messageErreur = 'Erreur lors de l\'inscription, veuillez réessayer.';
        }
      });
    } else {
      // Gérer les erreurs de validation
      this.showErrorMessage = 'Veuillez remplir tous les champs obligatoires et vérifier les erreurs.';
    }
  }

  // Validateur personnalisé pour vérifier si les mots de passe correspondent
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confimationMDP')?.value;
    if (password !== confirmPassword) {
      form.get('confimationMDP')?.setErrors({ mismatch: true });
    } else {
      form.get('confimationMDP')?.setErrors(null);
    }
  }
}

export function noThreeConsecutiveLetters(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /(.)\1{2}/; // Vérifie trois lettres identiques consécutives
    return value && regex.test(value) ? { 'threeConsecutiveLetters': true } : null;
  };
}
