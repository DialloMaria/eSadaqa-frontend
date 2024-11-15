import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/admin.Service';
import { OrganisationModel } from '../../../Models/Organiation.model';
import { UserModel } from '../../../Models/User.model';
import { AdminComponent } from '../admin/admin.component';
import { BeneficiaireModel } from '../../../Models/Beneficiaire.model';
import { SiderbarComponent } from '../sidebar/sidebar.component';
import { HeadersComponent } from '../headers/header.component';

@Component({
  selector: 'app-list-beneficiaire',
  standalone: true,
  imports: [RouterLink,CommonModule,HeadersComponent,
    SiderbarComponent],
  templateUrl: './list-beneficiaire.component.html',
  styleUrl: './list-beneficiaire.component.css'
})
export class ListBeneficiaireComponent implements OnInit {
  beneficiaires: any[] = [];
  users: UserModel[] = [];
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,

    private router: Router
  ) {}


  ngOnInit(): void {
    this.fetchAllBeneficiaires();
  }


  fetchAllBeneficiaires() {
    this.adminService.getAllBeneficiaire().subscribe(
      (response) => {
        console.log('Réponse complète de l\'API:', response); // Affiche toute la réponse
        if (response && response.data) {
          console.log('Liste des bénéficiaires:', response.data);
          this.beneficiaires = response.data;
        } else {
          console.warn('Données manquantes dans la réponse:', response); // Alerte si `data` est manquant
        }
      },
      (error) => {
        this.errorMessage = "Erreur lors du chargement des donateurs";
        console.error('Erreur:', error); // Affiche les erreurs dans la console
      }
    );
  }



}
