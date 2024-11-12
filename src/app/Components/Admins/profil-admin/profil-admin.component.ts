import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/admin.Service';
import { OrganisationModel } from '../../../Models/Organiation.model';
import { UserModel } from '../../../Models/User.model';
import { AdminComponent } from '../admin/admin.component';
import { BeneficiaireModel } from '../../../Models/Beneficiaire.model';

@Component({
  selector: 'app-profil-admin',
  standalone: true,
  imports: [RouterLink, CommonModule, AdminComponent],
  templateUrl: './profil-admin.component.html',
  styleUrl: './profil-admin.component.css'
})
export class ProfilAdminComponent implements OnInit {
  profilAdmins: any[] = [];
  users: UserModel[] = [];
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,

    private router: Router
  ) {}


  ngOnInit(): void {
    this.fetchProfilAdmin();
  }

  // fetchProfilAdmin() {
  //   this.adminService.getProfilAdmin().subscribe(
  //     (response) => {
  //       if (response && response.user) {
  //         this.users = response.user;
  //         console.log('Profil admin: ', this.users);
  //       } else {
  //         console.log('Aucune donnée trouvée dans la réponse', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des données', error);
  //       this.errorMessage = 'Une erreur est survenue lors de la récupération des données.';
  //     }
  //   );
  // }
  fetchProfilAdmin() {
    this.adminService.getProfilAdmin().subscribe(
      (response) => {
        if (response && response.user) {
          this.users = Array.isArray(response.user) ? response.user : [response.user];
          this.users.forEach((user: UserModel) => {
            user.photo_profile = user.photo_profile
              ? `http://127.0.0.1:8000/storage/${user.photo_profile}`
              : 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid';
          });
          console.log('Profil admin: ', this.users);
        } else {
          console.log('Aucune donnée trouvée dans la réponse', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
        this.errorMessage = 'Une erreur est survenue lors de la récupération des données.';
      }
    );
  }

}
