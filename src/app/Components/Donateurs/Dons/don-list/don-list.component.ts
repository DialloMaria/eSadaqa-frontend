import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { DonModel } from '../../../../Models/Don.model';
import { DonService } from './../../../../Services/don.Services';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DonFormComponent } from "../don-form/don-form.component";
import { AuthService } from '../../../../Services/auth.Service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormGroup } from '@angular/forms';
import { ReservationComponent } from '../../../Organisations/Reservations/reservation/reservation.component';
import { NotificationsComponent } from "../../../notifications/notifications.component";
import { PaginationComponent } from '../../../pagination/pagination.component';

@Component({
  selector: 'app-don-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    DonFormComponent,
    ReservationComponent,
    NgxPaginationModule,
    NotificationsComponent,
    PaginationComponent
],
  templateUrl: './don-list.component.html',
  styleUrl: './don-list.component.css'
})
export class DonListComponent implements OnInit {
  dons: DonModel[] = [];
  userId!: number;
  prenom!: string;
  photo_profile!: string;
  nombreDonsUtilisateur: number = 0;
  page: number = 1;
  reservationForm!: FormGroup;
  selectedDonId: number | null = null;
  length: number[] = [];
  reservations: any[] = [];
  don: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedDons: any[] = [];
  totalPages: number = 10;
  userRole!: string;

  @Output() reserveDon = new EventEmitter<number>();

  constructor(
    private DonService: DonService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllDons();
    this.getUserId();
  }

  getUserId(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user?.id || 0;
    this.prenom = user?.prenom || '';
    this.photo_profile = user?.photo_profile || '';
    this.userRole = user?.roles?.[0]?.name || '';
  }

  isOrganisation(): boolean {
    return this.userRole === 'organisation';
  }

  getAllDons(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.DonService.getAllDons().subscribe(
        (response: any) => {
          if (Array.isArray(response.data)) {
            this.dons = response.data
              .filter((don: DonModel) => don.created_by === this.userId)
              .slice()
              .reverse();

            this.nombreDonsUtilisateur = this.dons.length;
            this.dons.forEach((don: DonModel) => {
              don.image = don.image? `http://127.0.0.1:8000/storage/${don.image}`: 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid';

            });
            this.updatePaginatedDons();
          }
        },
        (error) => {
          if (error.status === 401) {
            this.showAlert('Erreur', 'Session expirée. Veuillez vous reconnecter.', 'error');
            this.router.navigate(['/connexion']);
          } else {
            console.error('Erreur lors de la récupération des dons:', error);
          }
        }
      );
    } else {
      this.showAlert('Erreur', 'Vous devez être connecté pour voir cette page.', 'error');
      this.router.navigate(['/connexion']);
    }
  }

  updatePaginatedDons(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDons = this.dons.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.getTotalPages()) return;
    this.currentPage = page;
    this.updatePaginatedDons();
  }

  getTotalPages(): number {
    return Math.ceil(this.dons.length / this.itemsPerPage);
  }

  isDonCreator(createdBy: number): boolean {
    return this.userId === createdBy;
  }

  deleteDon(id?: number): void {
    const token = localStorage.getItem('access_token');
    if (id !== undefined && token) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Êtes-vous sûr de vouloir supprimer ce don ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Non, annuler',
        customClass: {
          confirmButton: 'btn-supprimer',
          cancelButton: 'btn-annuler'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.DonService.deleteDon(id).subscribe(
            () => {
              this.showAlert('Succès', 'Le don a été supprimé avec succès.', 'success');
              this.getAllDons();
            },
            (error) => {
              console.error('Erreur lors de la suppression du don:', error);
              this.showAlert('Erreur', 'Une erreur est survenue lors de la suppression du don.', 'error');
            }
          );
        }
      });
    } else {
      this.showAlert('Erreur', 'Token non trouvé ou ID invalide.', 'error');
    }
  }

  showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question'): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
      timer: 2500,
      timerProgressBar: true,
      customClass: {
        confirmButton: 'btn-supprimer',
        cancelButton: 'btn-annuler'
      }
    });
  }

  voirDetails(don: any): void {
    console.log('Voir les détails du don:', don);
  }

  reserverDon(donId: number): void {
    this.selectedDonId = donId;
    console.log('Don ID sélectionné:', this.selectedDonId);
  }

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

}





