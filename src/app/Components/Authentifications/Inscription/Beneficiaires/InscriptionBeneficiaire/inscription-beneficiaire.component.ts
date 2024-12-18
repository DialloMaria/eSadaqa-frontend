 import { HttpClientModule } from '@angular/common/http';
 import { Component } from '@angular/core';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { Router, RouterLink } from '@angular/router';
 import { CommonModule } from '@angular/common';
import { ConnexionComponent } from "../../../Connexions/connexion.component";
import { RegisterBeneficiaireComponent } from "../BeneficiaireRegister/BeneficiaireRegister.component";
import { RegisterComponent } from '../register/register.component';

 @Component({
   selector: 'app-inscriptionBeneficiaire',
   standalone: true,
   imports: [ReactiveFormsModule, RouterLink, HttpClientModule, CommonModule, ConnexionComponent, RegisterBeneficiaireComponent,RegisterComponent],
   templateUrl: './inscription-beneficiaire.component.html',
   styleUrls: ['./inscription-beneficiaire.component.css']
 })
 export class InscriptionBenefiaireComponent {

  isSignupPerso = true; // Par défaut, on montre la page de connexion
  isSignupStructure = false; // Inscription est cachée par défaut


  constructor(private router: Router){

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


