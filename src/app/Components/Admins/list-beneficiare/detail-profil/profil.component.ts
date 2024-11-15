import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../Services/auth.Service';
import { AdminService } from '../../../../Services/admin.Service';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../../admin/admin.component';
import { OrganisationModel } from '../../../../Models/Organiation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../../../../Models/User.model';
import { DonateurModel } from '../../../../Models/Donateur.model';
import { BeneficiaireModel } from '../../../../Models/Beneficiaire.model';
import { SiderbarComponent } from '../../sidebar/sidebar.component';
import { HeadersComponent } from '../../headers/header.component';

@Component({
  selector: 'app-profilDetailBeneficiaire',
  standalone: true,
  imports: [CommonModule,RouterLink,HeadersComponent,
    SiderbarComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilDetailBeneficiaireComponent implements OnInit {
  // profilForm: FormGroup;
  ProfilDetailBeneficiaires: any [] = [];
  users: UserModel[] = [];
  beneficiaire: BeneficiaireModel[] = [];
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
    const donateurId = this.route.snapshot.paramMap.get('id');
    if (donateurId) {
      this.fetchProfilDetailBeneficiaire(donateurId);
    }
  }

  fetchProfilDetailBeneficiaire(id: string): void {
    this.adminService.getProfilDetailBeneficiaire(id).subscribe(
      (response) => {
        this.ProfilDetailBeneficiaires = Array.isArray(response.beneficiaire)? response.beneficiaire: [response.beneficiaire];

        this.ProfilDetailBeneficiaires.forEach((beneficiaire:UserModel ) => {
          beneficiaire.photo_profile = beneficiaire.photo_profile? `http://127.0.0.1:8000/storage/${beneficiaire.photo_profile}`: 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid';
        });
        }
    )
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
