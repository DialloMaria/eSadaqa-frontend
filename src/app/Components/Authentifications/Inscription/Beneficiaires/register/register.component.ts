import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../Services/auth.Service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

 registerForm: FormGroup;
 successMessage: string = '';
 errorMessage: string = '';
 currentStep : number = 1;

 constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
   this.registerForm = this.fb.group({
     nom: ['', [Validators.required, Validators.maxLength(255)]],
     prenom: ['', [Validators.required, Validators.maxLength(255)]],
     email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
     password: ['', [Validators.required, Validators.minLength(6)]],
     adresse: ['', [Validators.required, Validators.maxLength(255)]],
     telephone: ['', [Validators.maxLength(15)]],
     nomstructure: ['', [Validators.maxLength(255)]],
     emailstructure: ['', [Validators.email, Validators.maxLength(255)]],
     description: [''],
     telstructure: ['', [Validators.maxLength(15)]],
     logo: [null],
     fondateur: ['', [Validators.maxLength(100)]],
     date_creation: ['', Validators.required],
     recepisse: [null, Validators.required],
     image_cni: [null],
     photo_profile: [null]
   });
 }

//  nextStep() {
//   if (this.registerForm.controls['nom'].valid &&
//       this.registerForm.controls['prenom'].valid &&
//       this.registerForm.controls['email'].valid &&
//       this.registerForm.controls['adresse'].valid &&
//       this.registerForm.controls['telephone'].valid &&
//       this.registerForm.controls['photo_profile'].valid &&
//       this.registerForm.controls['password'].valid) {
//     this.currentStep = 2;
//   } else {
//     this.registerForm.markAllAsTouched();
//   }
// }

previousStep() {
  this.currentStep = 1;
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
   this.authService.registerBeneficiaire(formData).subscribe({
     next: (response) => {
       this.successMessage = 'Votre inscription a réussi. Vous pouvez maintenant vous connecter.';
       this.router.navigate(['/connexion']);
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
