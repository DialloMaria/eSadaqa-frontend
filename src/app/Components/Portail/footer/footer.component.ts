import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-headersMenu',
  standalone: true,
  imports: [

],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class footersComponent {


constructor(
  private router: Router
) {}


logout(): void {
  const token = localStorage.getItem('access_token');
  if (token) {
    // Suppression des informations d'authentification
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    // Redirection vers la page de connexion
    this.router.navigateByUrl('/connexion');
  } else {
    console.error('Token non trouvé.');
  }
}


// profilAdmin()

}







