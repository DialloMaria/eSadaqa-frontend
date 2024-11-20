import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,

],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SiderbarComponent {
  isSidebarOpen = false;


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


toggleSidebar(): void {
  this.isSidebarOpen = !this.isSidebarOpen;
}


// profilAdmin()

}







