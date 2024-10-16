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


@Component({
  selector: 'app-admin-dashbord-menu',
  standalone: true,
  imports: [
    CommonModule,
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
      const dates = data.map(item => item.date); // Extraction des dates
      const totals = data.map(item => item.total); // Extraction des totaux

      this.createChart(dates, totals); // Création du graphique
    });
}




// Méthode pour créer un graphique à partir des données
createChart(dates: string[], totals: number[]) {
  this.chart = new Chart('donChart', {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Évolution des Dons',
        data: totals,
        fill: false,
        borderColor: '#ce0033',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true, // Permet de personnaliser les dimensions
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
    .subscribe((data: ProduitModel[]) => {
      const nomProduit = data.map(item => item.libelle);  // Extraction des noms des produits
      const quantiteProduit = data.map(item => item.quantite); // Extraction des quantités fournies
      console.log('Données reçues du serveur:', data);

      // Vérifiez ici les valeurs undefined dans les quantités
      const undefinedQuantities = quantiteProduit.filter(value => value === undefined || value === null);
      if (undefinedQuantities.length > 0) {
        console.warn('Certaines quantités sont undefined ou null:', undefinedQuantities);
      }

      const filteredQuantiteProduit = quantiteProduit.filter((value): value is number => value !== undefined && value !== null);

      console.log('Produits:', nomProduit);
      console.log('Quantité filtrée:', filteredQuantiteProduit);

      this.createBarChart(nomProduit, filteredQuantiteProduit); // Création du graphique
    });
}


createBarChart(nomProduit: string[], filteredQuantiteProduit: number[]) {
  this.chart = new Chart('productChart', {
    type: 'bar', // Type du graphique: barres
    data: {
      labels: nomProduit, // Noms des produits comme étiquettes
      datasets: [{
        label: 'Quantité de Produits Fournis',
        data: filteredQuantiteProduit, // Quantités fournies des produits
        backgroundColor: '#ff6137', // Couleur des barres
        borderColor: '#ce0033', // Couleur de la bordure des barres
        borderWidth: 1 // Épaisseur de la bordure
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Permet de personnaliser les dimensions du graphique
      scales: {
        y: {
          beginAtZero: true // Commencer l'axe Y à zéro
        }
      }
    }
  });
}


}







