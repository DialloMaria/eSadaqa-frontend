import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/admin.Service';
import { OrganisationModel } from '../../../Models/Organiation.model';
import { UserModel } from '../../../Models/User.model';
import { AdminComponent } from '../admin/admin.component';
import { HeadersComponent } from '../headers/header.component';
import { SiderbarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-list-organisation',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HeadersComponent,
    SiderbarComponent
  ],
  // imports: [RouterLink,CommonModule,AdminComponent],

  templateUrl: './list-organisation.component.html',
  styleUrl: './list-organisation.component.css'
})
export class ListeOrganisationComponent  {
  organisations: OrganisationModel[] = [];
  users: UserModel[] = [];
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,

    private router: Router
  ) {}


  ngOnInit(): void {
    this.fetchOrganisations();
    console.log('ggg',  this.fetchOrganisations());

  }

  fetchOrganisations() {
    this.adminService.getOrganisations().subscribe(
      (response) => {
        if (response.success) {
          this.organisations = response.donateurs_structures;
          this.organisations.forEach((organisation: OrganisationModel) => {
            organisation.photo_profile = organisation.user?.photo_profile? `http://127.0.0.1:8000/storage/${organisation.photo_profile}`: 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid';
          });
          console.log('Organisations: ', this.organisations);
        }
      },
      (error) => {
        this.errorMessage = "Erreur lors du chargement des organisations";
      }
    );
  }

  // Méthode pour récupérer les organisations
  // fetchOrganisations() {
  //   this.adminService.getOrganisations().subscribe(
  //     (response) => {
  //       if (response.success) {
  //         this.organisations = response.donateurs_structures;
  //         this.users = response.donateurs_structures.user;
  //         console.log('rrr',  this.organisations );
  //         console.log('ttt' , this.users );


  //       }
  //     },
  //     (error) => {
  //       this.errorMessage = "Erreur lors du chargement des organisations";
  //     }
  //   );
  // }


}
