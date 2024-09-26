 import { HttpClientModule } from '@angular/common/http';
 import { Component } from '@angular/core';
 import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
 import { AuthService } from '../../../Services/auth.Service';
 import { Router } from '@angular/router';
 import { CommonModule } from '@angular/common';

 @Component({
   selector: 'app-inscription',
   standalone: true,
   imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
   templateUrl: './inscription.component.html',
   styleUrls: ['./inscription.component.css']
 })
 export class InscriptionComponent {
  constructor (private router: Router){
    
  }

}
