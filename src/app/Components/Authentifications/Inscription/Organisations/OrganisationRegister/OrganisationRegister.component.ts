import { AuthService } from '../../../../../Services/auth.Service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  selectedFile: File | null = null;
  selectedLogo: File | null = null;
  selectedRecepisse: File | null = null;
  isSignupPerso = true; // Par défaut, on montre la page de connexion
  isSignupStructure = false; // Inscription est cachée par défaut


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.OrganisationRegister = this.fb.group({
      // Step 1 fields
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),  Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),  Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, this.phoneValidator, Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
      confimationMDP: ['', Validators.required],
      photo_profile: [null, Validators.required],


      // Step 2 fields
      nomstructure: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      emailstructure: ['', [Validators.required, Validators.email]],
      description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255),this.letterValidator]],
      typestructure: ['', Validators.required],
      siege: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20), this.letterValidator]],
      logo: [null, Validators.required],
      date_creation: ['', [Validators.required, this.dateNotInFuture]],
      recepisse: [null, Validators.required],
      fondateur: [ Validators.required],
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

  nextStep() {
    if(this.OrganisationRegister.controls['nom'].valid &&
      this.OrganisationRegister.controls['prenom'].valid &&
      this.OrganisationRegister.controls['email'].valid &&
      this.OrganisationRegister.controls['adresse'].valid &&
      this.OrganisationRegister.controls['telephone'].valid &&
      this.OrganisationRegister.controls['photo_profile'].valid &&
      this.OrganisationRegister.controls['password'].valid)  {
      this.currentStep = 2;
    } else {
      this.OrganisationRegister.markAllAsTouched(); // Mark all fields as touched to show validation messages
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
      this.OrganisationRegister.patchValue({
        photo_profile: this.selectedFile
      });
    }
  }

  onLogoSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedLogo = fileInput.files[0];
      this.OrganisationRegister.patchValue({
        logo: this.selectedLogo,
      });
    }
  }

  onRecepisseSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedRecepisse = input.files[0];
      this.OrganisationRegister.patchValue({
        recepisse: this.selectedRecepisse,
      });
    }
  }

  // Soumission du formulaire
  submit(): void {
    const formData = new FormData();

    // Ajoutez tous les champs texte et les fichiers dans formData
    formData.append('nom', this.OrganisationRegister.get('nom')?.value);
    formData.append('prenom', this.OrganisationRegister.get('prenom')?.value);
    formData.append('email', this.OrganisationRegister.get('email')?.value);
    formData.append('adresse', this.OrganisationRegister.get('adresse')?.value);
    formData.append('telephone', this.OrganisationRegister.get('telephone')?.value);
    formData.append('password', this.OrganisationRegister.get('password')?.value);
    formData.append('confimationMDP', this.OrganisationRegister.get('confimationMDP')?.value);
    formData.append('nomstructure', this.OrganisationRegister.get('nomstructure')?.value);
    formData.append('emailstructure', this.OrganisationRegister.get('emailstructure')?.value);
    formData.append('description', this.OrganisationRegister.get('description')?.value);
    formData.append('typestructure', this.OrganisationRegister.get('typestructure')?.value);
    formData.append('siege', this.OrganisationRegister.get('siege')?.value);
    formData.append('date_creation', this.OrganisationRegister.get('date_creation')?.value);
    formData.append('fondateur', this.OrganisationRegister.get('fondateur')?.value);

    // Ajoutez les fichiers si sélectionnés
    if (this.selectedFile) {
      formData.append('photo_profile', this.selectedFile);
    }
    if (this.selectedLogo) {
      formData.append('logo', this.selectedLogo);
    }
    if (this.selectedRecepisse) {
      formData.append('recepisse', this.selectedRecepisse);
    }

    // Envoyer les données
    this.authService.registerOrganisation(formData).subscribe({
      next: () => {
        console.log('Inscription réussie avec succès');
        this.router.navigate(['/connexion']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription', err.error); // Affichez les erreurs précises
      }
    });
  }




    // Méthode pour afficher le formulaire de connexion
    showLogin() {
      this.isSignupPerso = true;
      this.isSignupStructure = false;
    }

    // Méthode pour afficher le formulaire d'inscription
    showSignup() {
      this.isSignupPerso = false;
      this.isSignupStructure = true;
    }
}
