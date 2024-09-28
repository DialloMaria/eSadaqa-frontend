import { Component } from '@angular/core';
import { ProduitModel } from '../../../../Models/TypeProduit.model';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../../../../Services/produit.Service';

@Component({
  selector: 'app-produit-detail',
  standalone: true,
  imports: [],
  templateUrl: './produit-detail.component.html',
  styleUrl: './produit-detail.component.css'
})
export class ProduitDetailComponent {
  produit!: ProduitModel;

  constructor(private route: ActivatedRoute, private produitService: ProduitService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.produitService.getProduitById(id).subscribe(data => {
      this.produit = data;
    });
  }
}
