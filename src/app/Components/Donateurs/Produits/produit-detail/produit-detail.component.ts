import { Component } from '@angular/core';
import { ProduitModel } from '../../../../Models/TypeProduit.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProduitService } from '../../../../Services/produit.Service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-detail',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './produit-detail.component.html',
  styleUrl: './produit-detail.component.css'
})
export class ProduitDetailComponent {
  donId: number | null = null;
  produit!: ProduitModel;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.produitService.getProduitsByDonId(id).subscribe(data => {
    });
  }

      // Fonction pour obtenir les détails du don
      getProduitsByDonId(id: number): void {
        this.produitService.getProduitsByDonId(id).subscribe((response: any) => {
          // Vérifiez si la réponse contient des données
          if (response && response.data) {
            this.produit = response.data; // Affectez les données récupérées à `don`
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
