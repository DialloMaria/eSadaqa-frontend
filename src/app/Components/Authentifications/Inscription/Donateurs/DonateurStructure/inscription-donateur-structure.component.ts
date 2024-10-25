import { AuthService } from '../../../../../Services/auth.Service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  styleUrls: ['./inscription-donateur-structure.component.css']
})
export class InscriptionDonateurStructureComponent {
  InscriptionStructureForm: FormGroup;
  isEditMode = false;
  currentStep: number = 1;
  selectedFile: File | null = null;
  selectedLogo: File | null = null;
  selectedRecepisse: File | null = null;



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.InscriptionStructureForm = this.fb.group({
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
      recepisse: [null, Validators.required]
    }, { validators: this.passwordMatchValidator });
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

  // Validator personnalisé pour le champ Siège
  // alphanumericValidator(control: AbstractControl): ValidationErrors | null {
  //   const siegeValue = control.value;

  //   if (!siegeValue) {
  //     return null; // Si le champ est vide, laisser Validators.required gérer cette erreur
  //   }

  //   const hasLetter = /[a-zA-Z]/.test(siegeValue);
  //   const hasNumber = /\d/.test(siegeValue);

  //   if (!hasLetter || !hasNumber) {
  //     return { alphanumeric: true }; // Erreur si le champ ne contient pas à la fois des lettres et des chiffres
  //   }

  //   return null; // Si tout va bien, retourner null
  // }
  // Validator to check if passwords match
  private passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confimationMDP')?.value
      ? null
      : { mismatch: true };
  }

  nextStep() {
    if (this.InscriptionStructureForm.controls['nom'].valid &&
        this.InscriptionStructureForm.controls['prenom'].valid &&
        this.InscriptionStructureForm.controls['email'].valid &&
        this.InscriptionStructureForm.controls['adresse'].valid &&
        this.InscriptionStructureForm.controls['telephone'].valid &&
        this.InscriptionStructureForm.controls['photo_profile'].valid &&
        this.InscriptionStructureForm.controls['password'].valid) {
      this.currentStep = 2;
    } else {
      this.InscriptionStructureForm.markAllAsTouched();
    }
  }
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const dateCreation = new Date(control.value);
    const currentDate = new Date();

    if (!control.value) {
      return null;
    }

    return dateCreation > currentDate ? { futureDate: true } : null;
  }

  previousStep() {
    this.currentStep = 1;
  }

  // Gestion de la sélection de fichiers
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.InscriptionStructureForm.patchValue({
        photo_profile: this.selectedFile
      });
    }
  }

  onLogoSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedLogo = fileInput.files[0];
      this.InscriptionStructureForm.patchValue({
        logo: this.selectedLogo,
      });
    }
  }

  onRecepisseSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedRecepisse = input.files[0];
      this.InscriptionStructureForm.patchValue({
        recepisse: this.selectedRecepisse,
      });
    }
  }

  submit() {
    if (this.InscriptionStructureForm.valid) {
      const formData = new FormData();
      // Append personal info
      formData.append('nom', this.InscriptionStructureForm.value.nom);
      formData.append('prenom', this.InscriptionStructureForm.value.prenom);
      formData.append('email', this.InscriptionStructureForm.value.email);
      formData.append('adresse', this.InscriptionStructureForm.value.adresse);
      formData.append('telephone', this.InscriptionStructureForm.value.telephone);
      formData.append('password', this.InscriptionStructureForm.value.password);
      formData.append('photo_profile', this.selectedFile as Blob);

      // Append structure info
      formData.append('nomstructure', this.InscriptionStructureForm.value.nomstructure);
      formData.append('emailstructure', this.InscriptionStructureForm.value.emailstructure);
      formData.append('description', this.InscriptionStructureForm.value.description);
      formData.append('typestructure', this.InscriptionStructureForm.value.typestructure);
      formData.append('siege', this.InscriptionStructureForm.value.siege);
      formData.append('logo', this.selectedLogo as Blob); // Use the selected logo file
      formData.append('date_creation', this.InscriptionStructureForm.value.date_creation);
      formData.append('recepisse', this.selectedRecepisse as Blob); // Use the selected recepisse file

      // Here you would call the service to submit the form data
      this.authService.registerdonateurStructure(formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully', response);
          this.router.navigate(['/connexion']); // Navigate to a success page or another route
        },
        error: (error) => {
          console.error('Error submitting form', error);
        }
      });
    }
  }
}
