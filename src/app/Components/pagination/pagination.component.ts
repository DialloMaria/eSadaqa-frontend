import { Component } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.Service';

@Component({
  selector: 'app-paginations',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  dons: any[] = []; // Vos données de dons ici
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 6; // Nombre de cartes par page
  paginatedDons: any[] = []; // Tableau des dons paginés

  constructor() {}

  ngOnInit(): void {
    // Remplacez par la méthode pour récupérer vos dons
    this.loadDons();
    this.updatePaginatedDons();
  }

  loadDons(): void {
    // Exemple de chargement de vos dons, remplacer avec vos données
    this.dons = [
    ];
  }

  updatePaginatedDons(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDons = this.dons.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.getTotalPages()) return; // Limites de pages
    this.currentPage = page;
    this.updatePaginatedDons();
  }

  getTotalPages(): number {
    return Math.ceil(this.dons.length / this.itemsPerPage);
  }
 }

