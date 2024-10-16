import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/admin.Service';
import { OrganisationModel } from '../../../Models/Organiation.model';
import { UserModel } from '../../../Models/User.model';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-list-beneficiaire',
  standalone: true,
  imports: [RouterLink,CommonModule,AdminComponent],
  templateUrl: './list-beneficiaire.component.html',
  styleUrl: './list-beneficiaire.component.css'
})
export class ListBeneficiaireComponent  {
  organisations: OrganisationModel[] = [];
  users: UserModel[] = [];
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,

    private router: Router
  ) {}



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
