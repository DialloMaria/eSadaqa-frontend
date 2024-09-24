import { Routes } from '@angular/router';
import { InscriptionComponent } from './Components/Authentifications/Inscriptions/inscription.component';
import { ConnexionComponent } from './Components/Authentifications/Connexions/connexion.component';
import { DonComponent } from './Components/Donateurs/Dons/don.component';
import { AccueilComponent } from './Components/Portail/accueil.component';

export const routes: Routes = [



// Routes portails et par defaut
  // {path:'**', pathMatch:'full', redirectTo:'accueil'},
  // {path: 'accueil', component: AccueilComponent},

// Routes pour l'authentification
  {path: 'inscription', component:InscriptionComponent},
  {path: 'connexion', component:ConnexionComponent},


  // Route pour les Donateurs
  {path: 'donateur' , component:DonComponent},



  // Route pour les Organisations



  // Route pour les Beneficiaires




];

