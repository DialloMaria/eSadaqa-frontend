import { Routes } from '@angular/router';
import { InscriptionComponent } from './Components/Authentifications/Inscriptions/inscription.component';
import { ConnexionComponent } from './Components/Authentifications/Connexions/connexion.component';
import { AccueilComponent } from './Components/Portail/accueil.component';
import { DonListComponent } from './Components/Donateurs/Dons/don-list/don-list.component';
import { DonFormComponent } from './Components/Donateurs/Dons/don-form/don-form.component';

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



  // Route pour les Beneficiaires
  // {path: 'beneficiaire' , component: BeneficiaireComponent},




];

