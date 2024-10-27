import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../../Models/User.model';
import { AuthService } from '../../../Services/auth.Service';
import { RoleModel } from '../../../Models/Roles.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
              this.router.navigateByUrl('dons');
            } else if (response.user.roles.some((role: RoleModel) => role.name === 'organisation')) {
              this.router.navigateByUrl('list/don');
            } else if (response.user.roles.some((role: RoleModel) => role.name === 'beneficiaire')) {
              this.router.navigateByUrl('rapport');
            } else if (response.user.roles.some((role: RoleModel) => role.name === 'admin')) {
              this.router.navigateByUrl('dashboard');
            }
            else {
              this.router.navigateByUrl('donateur');
            }
          }
        },
        (error) => {
          console.error(error);
          // Afficher une alerte d'erreur
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur de connexion, veuillez vérifier vos informations.'
          });
        }
      );
    } else {
      // Afficher une alerte si le formulaire est invalide
      Swal.fire({
        icon: 'warning',
        title: 'Formulaire invalide',
        text: 'Veuillez entrer un email et un mot de passe valides.'
      });
    }
  }

  // logout(){
  //   this.authService.logout();
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('user');
  //   this.router.navigateByUrl('/connexion');
  // }
  logout(): void {
    const token = localStorage.getItem('access_token');

    if (token) {
      // Afficher une boîte de dialogue de confirmation
      Swal.fire({
        title: 'Confirmation',
        text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, déconnectez-moi',
        cancelButtonText: 'Non, annuler',
        customClass: {
          confirmButton: 'btn-supprimer', // Classe CSS pour personnaliser le bouton de confirmation
          cancelButton: 'btn-annuler'     // Classe CSS pour personnaliser le bouton d'annulation
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // L'utilisateur a confirmé la déconnexion
          this.authService.logout(); // Appelle le service d'authentification pour la déconnexion
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');

          // Afficher une alerte de déconnexion réussie
          this.showAlert('Déconnexion réussie', 'Vous avez été déconnecté avec succès.', 'success');
          this.router.navigateByUrl('/connexion'); // Redirige vers la page de connexion
        }
      });
    } else {
      console.error('Token non trouvé.');
      this.showAlert('Erreur', 'Token non trouvé.', 'error');
    }
  }

  // Méthode pour afficher les alertes avec SweetAlert2
  showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question'): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn-supprimer', // Classe CSS pour personnaliser le bouton de confirmation
        cancelButton: 'btn-annuler'     // Classe CSS pour personnaliser le bouton d'annulation
      }
    });
  }

}
