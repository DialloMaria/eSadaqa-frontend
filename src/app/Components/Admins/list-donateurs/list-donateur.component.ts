import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/admin.Service';
import { OrganisationModel } from '../../../Models/Organiation.model';
import { UserModel } from '../../../Models/User.model';
import { AdminComponent } from '../admin/admin.component';
import { DonateurModel } from '../../../Models/Donateur.model';
import { SiderbarComponent } from '../sidebar/sidebar.component';
import { HeadersComponent } from '../headers/header.component';

@Component({
  selector: 'app-list-donateurs',
  standalone: true,
  imports: [RouterLink,CommonModule, SiderbarComponent, HeadersComponent],
  templateUrl: './list-donateur.component.html',
  styleUrl: './list-donateur.component.css'
})
export class ListeAllDonateurComponent implements OnInit {
  donateurs: DonateurModel[] = [];
  users: UserModel[] = [];
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,

    private router: Router
  ) {}


  ngOnInit(): void {
    this.fetchAllDonateurs();

  }

  fetchAllDonateurs() {
    this.adminService.getAllDonateurs().subscribe(
      (response) => {
        if (response) {
          this.donateurs = response.data;
          this.donateurs.forEach((donateur: DonateurModel) => {
            donateur.photo_profile = donateur.photo_profile? `http://127.0.0.1:8000/storage/${donateur.photo_profile}`: 'https://img.freepik.com/photos-gratuite/pot-miel-cote-pot-miel_1340-23142.jpg?ga=GA1.1.242611404.1703246724&semt=ais_hybrid';
          });
          console.log('Donateur');

        }
      },
      (error) => {
        this.errorMessage = "Erreur lors du chargement des donateurs";
      }
    );
  }



}
