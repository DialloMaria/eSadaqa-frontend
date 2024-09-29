import { Component, OnInit } from '@angular/core';
import { DonModel } from '../../../../Models/Don.model';
import { DonService } from '../../../../Services/don.Services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProduitModel } from '../../../../Models/TypeProduit.model';

@Component({
  selector: 'app-don-detail',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './don-detail.component.html',
  styleUrl: './don-detail.component.css'
})
export class DonDetailComponent  {
  don: DonModel | null = null;
  produit!:ProduitModel;
  donId: number | null = null;

  constructor(
    private donService: DonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupère l'ID du don depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.donId = +id; // Convertir l'ID en nombre
        this.getDonDetails(this.donId);
      }
    });
  }
    // Fonction pour obtenir les détails du don
    getDonDetails(id: number): void {
      this.donService.getDonById(id).subscribe((response: any) => {
        // Vérifiez si la réponse contient des données
        if (response && response.data) {
          this.don = response.data; // Affectez les données récupérées à `don`
        } else {
          console.error('Aucune donnée trouvée');
          this.router.navigate(['/dons']); // Redirection si aucune donnée
        }
      }, error => {
        console.error('Erreur lors de la récupération des détails du don:', error);
        this.router.navigate(['/dons']); // Redirection si le don n'est pas trouvé
      });
    }



}
