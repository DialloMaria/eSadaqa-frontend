import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DonModel } from '../../../Models/Don.model';
import { DonService } from '../../../Services/don.Services';
import { AuthService } from '../../../Services/auth.Service';
import { DonFormComponent } from '../../Donateurs/Dons/don-form/don-form.component';
import { ReservationComponent } from '../../Organisations/Reservations/reservation/reservation.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DonEvolution } from '../../../Models/DonEvolution.model';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import {  BarController, BarElement} from 'chart.js';
import { ProduitService } from '../../../Services/produit.Service';
import { ProduitModel } from '../../../Models/TypeProduit.model';
import { ProfilAdminComponent } from "../profil-admin/profil-admin.component";


@Component({
  selector: 'app-admin-dashbord-menu',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CalendarModule,
    RouterLink,
    CommonModule,
    DonFormComponent,
    ReservationComponent,
    NgxPaginationModule,
    NotificationsComponent,
    AdminComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    BsDatepickerModule,
    ProfilAdminComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

dons: DonModel[] = [];
filteredDons: DonModel[] = [];
userId!: number; // ID de l'utilisateur connecté
prenom!: string; // ID de l'utilisateur connecté
nombreDonsUtilisateur: number = 0;
page: number = 1;
reservationForm!:FormGroup;
selectedDonId: number | null = null;
selectedDate: Date = new Date(); // Date sélectionnée par l'utilisateur
errorMessage: string = '';
chart: any;
quantite!:number;
date!: string;
total!: number;
chartDons: Chart | null = null; // Pour le graphique d'évolution des dons
chartProduits: Chart | null = null; // Pour le graphique des produits

// chart!: Chart<"line", number[], string>;

constructor(
  private DonService: DonService,
  private router: Router,
  private dialog: MatDialog,
  private authService: AuthService,
  private ProduitServices:ProduitService


) {    // Enregistrer les composants Chart.js
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  Chart.register(BarController, BarElement, CategoryScale, LinearScale);
}

ngOnInit(): void {
  this.getDonsByDate(this.formatDate(this.selectedDate));
  this.getDonsEvolution();
  this.getEvolutionProduit();
}

// Fonction pour récupérer les dons en fonction de la date
getDonsByDate(date: string): void {
this.DonService.getDonsByDate(date).subscribe(
  (response) => {
    this.dons = response.data;
  },
  (error) => {
    this.errorMessage = 'Erreur lors de la récupération des dons.';
    console.error(error);
  }
);
}

// Quand l'utilisateur sélectionne une nouvelle date
onDateSelect(event: Date): void {
this.selectedDate = event;
const formattedDate = this.formatDate(event);
this.getDonsByDate(formattedDate);
}

// Formater la date en 'yyyy-MM-dd' pour l'API
formatDate(date: Date): string {
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
return `${year}-${month}-${day}`;
}

// Méthode pour récupérer les données de l'évolution des dons
getDonsEvolution() {
  this.DonService.getDonsEvolution()
    .subscribe((data: DonEvolution[]) => { // Utilisation du type DonEvolution
      console.log('Données d\'évolution des dons:', data); // Vérifiez ce que vous recevez
      const dates = data.map(item => item.date); // Extraction des dates
      const totals = data.map(item => item.total); // Extraction des totaux

      this.createChart(dates, totals); // Création du graphique
    }, error => {
      console.error('Erreur lors de la récupération des données d\'évolution:', error);
    });
}



// Méthode pour créer un graphique à partir des données
createChart(dates: string[], totals: number[]) {
  if (this.chartDons) {
    this.chartDons.destroy();
  }

  this.chartDons = new Chart('donChart', {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Évolution des Dons',
        data: totals,
        fill: false,
        borderColor: '#D4A017',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

getEvolutionProduit(): void {
  this.ProduitServices.getEvolutionProduit()
    .subscribe((response: { message: string; data: ProduitModel[] }): void => {
      console.log('Réponse complète:', response);

      const data = response.data;

      // Vérifiez si 'data' est bien un tableau
      if (Array.isArray(data)) {
        const nomProduit = data.map(item => item.libelle);
        const quantiteProduit = data.map(item => item.quantite);

        const filteredQuantiteProduit = quantiteProduit.filter((value): value is number => value !== undefined && value !== null);
        this.nombreDonsUtilisateur = this.dons.length;

        if (nomProduit.length > 0 && filteredQuantiteProduit.length > 0) {
          this.createBarChart(nomProduit, filteredQuantiteProduit);
        } else {
          console.warn('Aucune donnée à afficher pour le graphique à barres.');
        }
      } else {
        console.error('Les données reçues ne sont pas un tableau:', data);
      }
    });
}



createBarChart(nomProduit: string[], filteredQuantiteProduit: number[]) {
  console.log('Noms des produits:', nomProduit);
  console.log('Quantités des produits:', filteredQuantiteProduit);


  // Vérifiez si le graphique existe déjà et détruisez-le
  if (this.chart) {
    this.chart.destroy(); // Détruisez le graphique précédent s'il existe
  }

  // Création du nouveau graphique
  this.chart = new Chart('productChart', {
    type: 'bar',
    data: {
      labels: nomProduit,
      datasets: [{
        label: 'Quantité de Produits Fournis',
        data: filteredQuantiteProduit,
        backgroundColor: '#D4A017',
        borderColor: '#007461',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Mettre à jour le graphique après sa création
  this.chart.update();
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


// profilAdmin()

}







