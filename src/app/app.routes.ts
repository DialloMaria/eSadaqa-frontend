import { Routes } from '@angular/router';
import { InscriptionComponent } from './Components/Authentifications/Inscriptionst/inscription.component';
import { ConnexionComponent } from './Components/Authentifications/Connexions/connexion.component';
import { DonListComponent } from './Components/Donateurs/Dons/don-list/don-list.component';
import { DonFormComponent } from './Components/Donateurs/Dons/don-form/don-form.component';
import { ProduitListComponent } from './Components/Donateurs/Produits/produit-list/produit-list.component';
import { ProduitFormComponent } from './Components/Donateurs/Produits/produit-form/produit-form.component';
import { ProduitDetailComponent } from './Components/Donateurs/Produits/produit-detail/produit-detail.component';
import { DonDetailComponent } from './Components/Donateurs/Dons/don-detail/don-detail.component';
import { InscriptionPersoComponent } from './Components/Authentifications/Inscription/Donateurs/DonateurPersonel/inscription-donateur-perso.component';
import { InscriptionDonateurStructureComponent } from './Components/Authentifications/Inscription/Donateurs/DonateurStructure/inscription-donateur-structure.component';
import { RegisterOrganisationComponent } from './Components/Authentifications/Inscription/Organisations/OrganisationRegister/OrganisationRegister.component';
import { RegisterBeneficiaireComponent } from './Components/Authentifications/Inscription/Beneficiaires/BeneficiaireRegister/BeneficiaireRegister.component';
import { ReservationComponent } from './Components/Organisations/Reservations/reservation/reservation.component';
import { RapportComponent } from './Components/Beneficiaires/rapport/rapport.component';
import { AccueilComponent } from './Components/Portail/accueil.component';
import { ProposComponent } from './Components/Portail/propos/propos.component';
import { DemandeComponent } from './Components/Portail/demande/demande.component';
import { InscriptionDonateurComponent } from './Components/Authentifications/Inscription/Donateurs/InscriptionDonateur/inscription-donateur.component';
import { AdminComponent } from './Components/Admins/admin/admin.component';
import { ListDonReservationComponent } from './Components/Organisations/Dons/don-list/list-don-reservation.component';
import { ListBeneficiaireComponent } from './Components/Admins/list-beneficiare/list-beneficiaire.component';
import { ListeOrganisationComponent } from './Components/Admins/list-organisation/list-organisation.component';
import { ListDonComponent } from './Components/Admins/don-list/list-don.component';
import { InscriptionBenefiaireComponent } from './Components/Authentifications/Inscription/Beneficiaires/InscriptionBeneficiaire/inscription-beneficiaire.component';
import { RegisterComponent } from './Components/Authentifications/Inscription/Beneficiaires/register/register.component';
import { RoleGuard } from './guards/role.guard'; // Assurez-vous que le chemin est correct
import { ResponsiveComponent } from './Components/Portail/responsive/responsive.component';
import { ListeAllDonateurComponent } from './Components/Admins/list-donateurs/list-donateur.component';
import { ProfilAdminComponent } from './Components/Admins/profil-admin/profil-admin.component';
import { ProfilOrganisationComponent } from './Components/Organisations/profil/profil.component';
import { ProfilDonateurComponent } from './Components/Donateurs/profil/profil.component';
import { ProfilDetailOrganisationComponent } from './Components/Admins/list-organisation/detail-profil/profil.component';
import { ProfilDetailDonateurComponent } from './Components/Admins/list-donateurs/detail-profil/profil.component';
import { ProfilDetailBeneficiaireComponent } from './Components/Admins/list-beneficiare/detail-profil/profil.component';

export const routes: Routes = [
// Routes portails et par defaut
  // {path:'**', pathMatch:'full', redirectTo:'accueil'},
  {path: 'accueil', component: AccueilComponent},

  {path: 'me', component: ResponsiveComponent},

  {path: 'propos', component: ProposComponent},

  {path: 'demande', component: DemandeComponent},

// Routes pour l'authentification
  {path: 'inscription', component:InscriptionComponent},

  {path: 'inscription/donateur', component: InscriptionDonateurComponent}, // Inscription pour les donateurs personnels et structures

  {path: 'inscription/perso', component:InscriptionPersoComponent},

  {path: 'inscription/structure', component:InscriptionDonateurStructureComponent},

  {path: 'inscription/organisation', component:RegisterOrganisationComponent},

  {path: 'inscription/beneficiaire', component:InscriptionBenefiaireComponent},


  {path: 'registerB', component:  RegisterComponent},

  {path: 'inscription/daara', component:RegisterBeneficiaireComponent},

  {path: 'connexion', component:ConnexionComponent},

  {path: 'deconnexion', component: ConnexionComponent  },

  {path: 'dashboard', component: AdminComponent},

  {path: 'dashboard/organisation', component: ListeOrganisationComponent},

  {path: 'dashboard/donateurs', component: ListeAllDonateurComponent},

  {path: 'dashboard/dons', component:   ListDonComponent},

  {path: 'dashboard/Beneficiaire', component:   ListBeneficiaireComponent},

  {path: 'dashboard/profilAdmin', component:   ProfilAdminComponent},

  {path: 'profilOrganisation', component:   ProfilOrganisationComponent},

  { path: 'profilDetailOrganisation/:id', component: ProfilDetailOrganisationComponent },

  {path: 'profilDonateur', component:   ProfilDonateurComponent},

  {path: 'profilDetailDonateur/:id', component:   ProfilDetailDonateurComponent},
  {path: 'profilDetailBeneficiaire/:id', component:   ProfilDetailBeneficiaireComponent},



  // Route pour les Donateurs

  { path: 'dons', component: DonListComponent },

  { path: 'dons/add', component: DonFormComponent },

  { path: 'dons/:id', component: DonDetailComponent },

  { path: 'dons/edit/:id', component: DonFormComponent },
  // Route pour les Organisations
  {path: 'organisation/don' , component: DonListComponent},

  { path: 'reservations/create', component: ReservationComponent },

  { path: 'produits', component: ProduitListComponent }, // Liste de produits

  { path: 'produits/ajouter', component: ProduitFormComponent }, // Ajouter un produit

  { path: 'produits/:id', component: ProduitDetailComponent }, // Détail d'un produit

  { path: 'produits/:id/modifier', component: ProduitFormComponent }, // Modifier un produit

  // Route pour les Beneficiaires

  {path: 'rapport' , component: RapportComponent }, //

  { path: 'rapport/:id', component: RapportComponent },

  { path: 'list/don', component:   ListDonReservationComponent},

];
