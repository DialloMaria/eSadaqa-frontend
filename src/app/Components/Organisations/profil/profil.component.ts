import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.Service';
import { AdminService } from '../../../Services/admin.Service';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../../Admins/admin/admin.component';
import { OrganisationModel } from '../../../Models/Organiation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../../../Models/User.model';

@Component({
  selector: 'app-profilOrganisation',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilOrganisationComponent implements OnInit {
  // profilForm: FormGroup;
  ProfilOrganisations: OrganisationModel [] = [];
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
    // this.fetchProfilOrganisation();
  }

  // fetchProfilOrganisation(){
  //   this.adminService.g().subscribe(
  //     (response) => {
  //       if(response){
  //         this.ProfilOrganisations = response.organisation;
  //       }
  //     },
  //     (error) => {
  //       this.errorMessage = "Erreur lors du chargement des organisations";

  //     }
  //     );
  // }
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
