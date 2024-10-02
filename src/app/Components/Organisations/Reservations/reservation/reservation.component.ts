import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../../../Services/reservation.Service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  reservationForm: FormGroup;
  beneficiaires: any[] = [];
  dons: any[] = [];
  token: string = "";

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      description: ['', Validators.required],
      don_id: ['', Validators.required],
      beneficiaire_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Charger les bénéficiaires et les dons
    this.loadBeneficiaires();
    this.loadDons();
  }

  // Charger les bénéficiaires depuis l'API
loadBeneficiaires(): void {
  this.reservationService.getBeneficiaires().subscribe({
    next: (data) => {
      console.log('Données reçues:', data); // Vérifiez la structure ici
      if (data.success) {
        this.beneficiaires = Array.isArray(data.beneficiaires) ? data.beneficiaires : [];
        console.log('Bénéficiaires:', this.beneficiaires); // Vérifiez les bénéficiaires
      } else {
        console.error('Aucun bénéficiaire trouvé dans la réponse');
      }
    },
    error: (err) => console.error('Erreur lors du chargement des bénéficiaires:', err)
  });
}

// loadDons(): void {
//   this.reservationService.getDons().subscribe({
//     next: (data) => {
//       console.log('Données reçues:', data); // Vérifiez la structure ici
//       if (data.success) {
//         this.dons = Array.isArray(data.dons) ? data.dons : [];
//         console.log('dons:', this.dons); // Vérifiez les bénéficiaires
//       } else {
//         console.error('Aucun dons trouvé dans la réponse');
//       }
//     },
//     error: (err) => console.error('Erreur lors du chargement des dons:', err)
//   });
// }

loadDons(): void {
  this.reservationService.getDons().subscribe({
    next: (response) => {
      console.log('Données reçues:', response); // Afficher toute la réponse ici
      if (Array.isArray(response.data)) {
        this.dons = response.data; // Assigner les données des dons
        console.log('dons:', this.dons); // Vérifiez les dons dans la console
      } else {
        console.error('Aucun don trouvé dans la réponse');
      }
    },
    error: (err) => console.error('Erreur lors du chargement des dons:', err)
  });
}


  // Soumettre le formulaire

  onSubmit(): void {
    if (this.reservationForm.valid) {
      this.reservationService.createReservation(this.reservationForm.value)
        .subscribe({
          next: (response) => {
            console.log('Réservation créée avec succès:', response);
            alert('Réservation créée avec succès !');
          },
          error: (error) => {
            if (error.status === 409) {
              // Afficher un message spécifique pour l'erreur 409
              alert('Erreur: Une réservation existe déjà pour ce don.');
            } else {
              console.error('Erreur lors de la création de la réservation:', error);
              alert('Erreur lors de la création de la réservation.');
            }
          }
        });
    }
  }

  // Charger les dons depuis l'API
  // loadDons(): void {
  //   // Assurez-vous que le token est bien initialisé
  //   this.token = localStorage.getItem('token') || ''; // Ou la méthode que vous utilisez pour obtenir le token

  //   this.reservationService.getDons().subscribe({
  //     next: (data) => {
  //       this.dons = data; // Mettez à jour la liste des dons
  //       console.log(data);
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors du chargement des dons:', err);
  //       // Ajoutez une gestion d'erreur plus conviviale si nécessaire
  //       if (err.status === 401) {
  //         alert('Vous devez vous connecter pour accéder à cette fonctionnalité.');
  //       }
  //     }
  //   });


  }








// this.donService.addDon(formData).subscribe({
//   next: (response) => {
//     const donId = response.data.id;
//     this.submitProduits(donId);
//     this.router.navigate(['/dons']);
//   },
//   error: (err) => {
//     console.error('Erreur lors de l\'ajout du don', err);
//   }
// });
// }

// submitProduits(donId: number): void {
// this.produits.forEach((produit) => {
//   produit.don_id = donId;
//   this.produitService.createProduit(produit).subscribe({
//     next: () => console.log('Produit ajouté avec succès'),
//     error: (err) => console.error('Erreur lors de l\'ajout du produit', err)
//   });
// });
// }
