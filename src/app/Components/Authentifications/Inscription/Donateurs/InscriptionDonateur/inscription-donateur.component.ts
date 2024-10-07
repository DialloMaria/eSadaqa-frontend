 import { HttpClientModule } from '@angular/common/http';
 import { Component } from '@angular/core';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { Router, RouterLink } from '@angular/router';
 import { CommonModule } from '@angular/common';
import { ConnexionComponent } from "../../../Connexions/connexion.component";
import { InscriptionPersoComponent } from "../DonateurPersonel/inscription-donateur-perso.component";
import { InscriptionDonateurStructureComponent } from "../DonateurStructure/inscription-donateur-structure.component";

 @Component({
   selector: 'app-inscription',
   standalone: true,
   imports: [ReactiveFormsModule, RouterLink, HttpClientModule, CommonModule, ConnexionComponent, InscriptionPersoComponent, InscriptionDonateurStructureComponent],
   templateUrl: './inscription-donateur.component.html',
   styleUrls: ['./inscription-donateur.component.css']
 })
 export class InscriptionDonateurComponent {

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


