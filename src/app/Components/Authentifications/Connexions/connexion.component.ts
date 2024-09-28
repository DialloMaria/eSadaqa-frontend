import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../../Models/User.model';
import { AuthService } from '../../../Services/auth.Service';
import { RoleModel } from '../../../Models/Roles.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [RouterLink,FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})

export class ConnexionComponent {
  loginForm: FormGroup;  // Formulaire réactif
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    protected authService: AuthService
  ) {
    // Initialisation du formulaire avec les champs
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Méthode pour se connecter
  login() {
    if (this.loginForm.valid) {
      const userObject = this.loginForm.value; // Récupération des valeurs du formulaire

      this.authService.login(userObject).subscribe(
        (response: any) => {
          if (response.user) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));

            // Vérifie les rôles et redirige en conséquence
            if (response.user.roles.some((role: RoleModel) => role.name === 'donateur')) {
              this.router.navigateByUrl('produits');
            } else if (response.user.roles.some((role: RoleModel) => role.name === 'organisation')) {
              this.router.navigateByUrl('organisation');
            } else if (response.user.roles.some((role: RoleModel) => role.name === 'beneficiaire')) {
              this.router.navigateByUrl('beneficiaire');
            } else {
              this.router.navigateByUrl('donateur');
            }
          }
        },
        (error) => {
          console.error(error);
          alert('Erreur de connexion, veuillez vérifier vos informations.');
        }
      );
    } else {
      alert('Veuillez entrer un email et un mot de passe valides.');
    }
  }
}
