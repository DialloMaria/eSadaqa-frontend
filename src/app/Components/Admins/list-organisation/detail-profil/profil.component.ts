import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../Services/auth.Service';
import { AdminService } from '../../../../Services/admin.Service';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../../admin/admin.component';
import { OrganisationModel } from '../../../../Models/Organiation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../../../../Models/User.model';

@Component({
  selector: 'app-profilDetailOrganisation',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilDetailOrganisationComponent implements OnInit {
  // profilForm: FormGroup;
  ProfilDetailOrganisations: any [] = [];
  users: UserModel[] = [];
  errorMessage: string = '';
  passwordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
    ){

  }

  ngOnInit(): void {
    const organisationId = this.route.snapshot.paramMap.get('id');
    if (organisationId) {
      this.fetchProfilOrganisation(organisationId);
    }

  }
  fetchProfilOrganisation(id: string): void {
    this.adminService.getProfilOrganisation(id).subscribe(
      (response) => {
        console.log(response);
        this.ProfilDetailOrganisations = Array.isArray(response.organisation)
          ? response.organisation
          : [response.organisation];
        this.ProfilDetailOrganisations.forEach((ProfilDetailOrganisation: OrganisationModel) => {
          ProfilDetailOrganisation.photo_profile = ProfilDetailOrganisation.photo_profile
            ? `http://127.0.0.1:8000/storage/${ProfilDetailOrganisation.photo_profile}`
            : 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid';
        });
      },
      (error) => {
        this.errorMessage = "Erreur lors du chargement de l'organisation";
      }
    );
  }

}
