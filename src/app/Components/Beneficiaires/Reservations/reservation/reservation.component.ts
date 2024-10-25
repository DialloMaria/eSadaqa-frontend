import { Component, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../../../Services/reservation.Service';
import { CommonModule } from '@angular/common';
import { DonModel } from '../../../../Models/Don.model';

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
  token: string = "";
  dons: DonModel[] = [];
  @Input() donId!: number;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      description: ['', Validators.required],
      beneficiaire_id: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    console.log('ID du don reçu depuis le parent:', this.donId);
    // Charger les bénéficiaires et les dons
    this.loadBeneficiaires();
    // this.loadDonAutomatically();
    // this.loadDons();
  }

  // Charger les bénéficiaires depuis l'API
loadBeneficiaires(): void {
  this.reservationService.getBeneficiaires().subscribe({
    next: (data) => {
      console.log('Données reçues:', data);
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

// loadDonAutomatically(): void {
//   this.reservationService.getDons().subscribe({
//     next: (response) => {
//       if (Array.isArray(response.data) && response.data.length > 0) {
//         this.dons = response.data;
//         // Automatically set the first available don (or select based on your logic)
//         // const defaultDonId = this.dons[0].id; // Assuming you want to use the first don
//         const defaultDonId = this.dons.forEach((dons: DonModel) => {
//         return  dons.id = dons.id
//         });
//         console.log('id don',defaultDonId);

//         this.reservationForm.patchValue({ don_id: defaultDonId });
//         console.log('Don sélectionné automatiquement:', defaultDonId);
//       } else {
//         console.error('Aucun don disponible');
//       }
//     },
//     error: (err) => console.error('Erreur lors du chargement des dons:', err)
//   });
// }

onSubmit(): void {
  // Vérifiez que le don_id est défini
  if (this.donId) {
    // Fusionnez don_id dans les valeurs du formulaire
    const reservationData = {
      ...this.reservationForm.value,
      don_id: this.donId // Ajoutez ici votre don_id
    };

    console.log(reservationData);

    if (this.reservationForm.valid) {
      this.reservationService.createReservation(reservationData) // Utilisez reservationData ici
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
  } else {
    alert('Erreur: Aucun ID de don trouvé.');
  }
}



  }

// loadDonAutomatically(): void {
//   this.reservationService.getDons().subscribe({
//     next: (response) => {
//       if (Array.isArray(response.data) && response.data.length > 0) {
//         this.dons = response.data;
//         // Automatically set the first available don (or select based on your logic)
//         const defaultDonId = this.dons[0].id; // Assuming you want to use the first don
//         this.reservationForm.patchValue({ don_id: defaultDonId });
//         console.log('Don sélectionné automatiquement:', defaultDonId);
//       } else {
//         console.error('Aucun don disponible');
//       }
//     },
//     error: (err) => console.error('Erreur lors du chargement des dons:', err)
//   });
// }

// loadDons(): void {
//   this.reservationService.getDons().subscribe({
//     next: (response) => {
//       console.log('Données reçues:', response); // Afficher toute la réponse ici
//       if (Array.isArray(response.data)) {
//         this.dons = response.data; // Assigner les données des dons
//         console.log('dons:', this.dons); // Vérifiez les dons dans la console
//       } else {
//         console.error('Aucun don trouvé dans la réponse');
//       }
//     },
//     error: (err) => console.error('Erreur lors du chargement des dons:', err)
//   });
// }


  // Soumettre le formulaire

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
