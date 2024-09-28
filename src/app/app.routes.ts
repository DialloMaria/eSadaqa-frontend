import { Routes } from '@angular/router';
import { InscriptionComponent } from './Components/Authentifications/Inscriptions/inscription.component';
import { ConnexionComponent } from './Components/Authentifications/Connexions/connexion.component';
import { AccueilComponent } from './Components/Portail/accueil.component';
import { DonListComponent } from './Components/Donateurs/Dons/don-list/don-list.component';
import { DonFormComponent } from './Components/Donateurs/Dons/don-form/don-form.component';
import { ProduitListComponent } from './Components/Donateurs/Produits/produit-list/produit-list.component';
import { ProduitFormComponent } from './Components/Donateurs/Produits/produit-form/produit-form.component';
import { ProduitDetailComponent } from './Components/Donateurs/Produits/produit-detail/produit-detail.component';

export const routes: Routes = [



// Routes portails et par defaut
  // {path:'**', pathMatch:'full', redirectTo:'accueil'},
  {path: 'accueil', component: AccueilComponent},

// Routes pour l'authentification
  {path: 'inscription', component:InscriptionComponent},
  {path: 'connexion', component:ConnexionComponent},


  // Route pour les Donateurs

  { path: 'dons', component: DonListComponent },
  { path: 'dons/add', component: DonFormComponent },
  { path: 'dons/edit/:id', component: DonFormComponent },
  // Route pour les Organisations
  // {path: 'organisation' , component: OrganisationComponent},


  { path: 'produits', component: ProduitListComponent }, // Liste de produits
  { path: 'produits/ajouter', component: ProduitFormComponent }, // Ajouter un produit
  { path: 'produits/:id', component: ProduitDetailComponent }, // Détail d'un produit
  { path: 'produits/:id/modifier', component: ProduitFormComponent }, // Modifier un produit

  // Route pour les Beneficiaires
  // {path: 'beneficiaire' , component: BeneficiaireComponent},




];

