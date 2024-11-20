import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/auth.Service';
import { HeadersComponent } from '../headers/header.component';
import { SiderbarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-registeraddbeneficiaire',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule,RouterLink, HeadersComponent,SiderbarComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class AddBeneficiaireComponent {

 registerForm: FormGroup;
 selectedFile: File | null = null;
 successMessage: string = '';
 errorMessage: string = '';
 currentStep : number = 1;

 constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
   this.registerForm = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),  Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
    prenom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),  Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    adresse: ['', Validators.required],
    telephone: ['', [Validators.required, this.phoneValidator, Validators.pattern(/^\d+$/)]],
    password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
    photo_profile: [null],

     nomstructure: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
     emailstructure: ['', [Validators.required, Validators.email]],
     description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255),this.letterValidator]],
    //  logo: [null, Validators.required],
     fondateur: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),  Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
     recepisse: [null, Validators.required],
     image_cni: [null],
     date_creation: ['', [Validators.required, this.dateNotInFuture]],

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

   // Validator personnalisé pour la date de création
   dateNotInFuture(control: AbstractControl): ValidationErrors | null {
    const dateValue = control.value;

    if (!dateValue) {
      return null; // Si le champ est vide, laisser Validators.required gérer cette erreur
    }

    const selectedDate = new Date(dateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour comparer uniquement les dates

    if (selectedDate > today) {
      return { futureDate: true }; // Erreur si la date sélectionnée est dans le futur
    }

    return null; // Si tout va bien, retourner null
  }
   // Validator personnalisé pour le champ Siège
   letterValidator(control: AbstractControl): ValidationErrors | null {
    const siegeValue = control.value;

    if (!siegeValue) {
      return null; // Si le champ est vide, laisser Validators.required gérer cette erreur
    }

    const hasLetter = /[a-zA-Z]/.test(siegeValue);

    if (!hasLetter) {
      return { letter: true }; // Erreur si le champ ne contient pas de lettres
    }

    return null; // Si tout va bien, retourner null
  }

nextStep() {
  if (
    this.registerForm.controls['nom'].valid &&
       this.registerForm.controls['prenom'].valid &&
       this.registerForm.controls['email'].valid &&
       this.registerForm.controls['adresse'].valid &&
       this.registerForm.controls['telephone'].valid &&
       this.registerForm.controls['photo_profile'].valid &&
       this.registerForm.controls['password'].valid
  ) {
    this.currentStep = 2
  } else {
    this.registerForm.markAllAsTouched();
    this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
    this.successMessage = '';
  }
}
  // Fonction pour soumettre le formulaire
  onSubmit() {
   if (this.registerForm.invalid) {
     return;
   }

   const formData = new FormData();
   Object.keys(this.registerForm.controls).forEach(key => {
     const value = this.registerForm.get(key)?.value;
     if (value) {
       formData.append(key, value);
     }
   });

   // Appel au service pour envoyer les données au backend
   this.authService.registerAddBeneficiaire(formData).subscribe({
     next: (response) => {
       this.successMessage = 'Votre inscription a réussi. Vous pouvez maintenant vous connecter.';
       this.router.navigate(['/dashboard/organisation']);
       this.errorMessage = 'erreur';
     },
     error: (error) => {
       this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
       this.successMessage = '';
     }
   });
 }

 // Fonction pour gérer les fichiers
 onFileChange(event: any, fieldName: string) {
   const file = event.target.files[0];
   this.registerForm.get(fieldName)?.setValue(file);
 }
}
