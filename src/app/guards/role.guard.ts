// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.Service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const expectedRole = next.data['role'];
    const userRole = this.authService.getUserRole(); // Remplacez par votre méthode d'obtention du rôle

    if (userRole === expectedRole) {
      return true; // Autoriser l'accès
    } else {
      this.router.navigate(['/connexion']); // Rediriger vers la page de connexion
      return false; // Bloquer l'accès
    }
  }
}
