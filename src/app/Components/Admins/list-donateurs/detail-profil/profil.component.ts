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
import { SiderbarComponent } from '../../sidebar/sidebar.component';
import { HeadersComponent } from '../../headers/header.component';

@Component({
  selector: 'app-profilDetailDonateur',
  standalone: true,
  imports: [CommonModule,RouterLink,SiderbarComponent,HeadersComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilDetailDonateurComponent implements OnInit {
  // profilForm: FormGroup;
  ProfilDonateurs: DonateurModel [] = [];
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
    const donateurId = this.route.snapshot.paramMap.get('id');
    if (donateurId) {
      this.fetchProfilDonateur(donateurId);
    }
  }

  fetchProfilDonateur(id: string): void {
    this.adminService.getProfilDetailDonateur(id).subscribe(
      (response) => {
        if (response && response.donateur) {
          // Flatten the structure so it can be easily displayed in the template
          const donateur = response.donateur;
          const userWithStructure = {...donateur,...donateur.donateur, // merge nested donateur structure details into the main object
            photo_profile: donateur.photo_profile
              ? `http://127.0.0.1:8000/storage/${donateur.photo_profile}`
              : 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid'
          };

          this.ProfilDonateurs = [userWithStructure]; // ensure the template can use this directly
          console.log('Profil Donateur: ', this.ProfilDonateurs);
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




  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
