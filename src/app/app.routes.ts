import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {LogicielComponent} from './components/logiciel/logiciel.component';
import { SiteFTPComponent } from './components/site-ftp/site-ftp.component';
import { CeduleComponent } from './components/cedule/cedule.component';
import { PageErreurComponent } from './components/page-erreur/page-erreur.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { JoindreComponent } from './components/joindre/joindre.component';
import { AideComponent } from './components/aide/aide.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { VoirProductionComponent } from './components/voir-production/voir-production.component';
import { CommandeComponent } from './components/commande/commande.component';
import { CommandeProduitComponent } from './components/commande-produit/commande-produit.component';
import { NewClientComponent } from './components/new-client/new-client.component';
import { CommandesWebComponent } from './components/commandes-web/commandes-web.component';
import { ProtectionRenseignementsComponent } from './components/protection-renseignements/protection-renseignements.component';
import { VoirClientsComponent } from './components/voir-clients/voir-clients.component';
import { VoirBoulangeComponent } from './components/voir-boulange/voir-boulange.component';
import { VoirFacturesComponent } from './components/voir-factures/voir-factures.component';
import { VoirUnClientComponent } from './components/voir-un-client/voir-un-client.component';
import { VoirUneFactureComponent } from './components/voir-une-facture/voir-une-facture.component';
import { VoirFactureParamComponent } from './components/voir-facture-param/voir-facture-param.component';
import { LivraisonComponent } from './components/livraison/livraison.component';
import { CommandeWebTableComponent } from './components/commande-web-table/commande-web-table.component';
import { RechercheClientComponent } from './components/recherche-client/recherche-client.component';
import { NewMessageComponent } from './components/new-message/new-message.component';

import { ListComponent } from './components/users/list/list.component';
import { AddEditComponent } from './components/users/add-edit/add-edit.component';
import { VoirFactureNgComponent } from './components/voir-facture-ng/voir-facture-ng.component';
import { VoirRecettesComponent } from './components/voir-recettes/voir-recettes.component';
import { VoirDetailsComponent } from './components/voir-details/voir-details.component';
import { VoirClientsLogicielComponent } from './components/voir-clients-logiciel/voir-clients-logiciel.component';
import { ClientLogicielAddComponent } from './components/client-logiciel-add/client-logiciel-add.component';
import { ModifyClientLogicielComponent } from './components/modify-client-logiciel/modify-client-logiciel.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { SelectDateRangeComponent } from './components/select-date-range/select-date-range.component';
import { VoirGraphicComponent } from './components/voir-graphic/voir-graphic.component';
import { VoirProduitsComponent } from './components/voir-produits/voir-produits.component';
import { VoirRecettesDragComponent } from './components/voir-recettes-drag/voir-recettes-drag.component';
import { VoirRecettesMysqlComponent } from './components/voir-recettes-mysql/voir-recettes-mysql.component';
import { NomIndividuelComponent } from './components/nom-individuel/nom-individuel.component';
import { AddHeureRuptureComponent } from './components/add-heure-rupture/add-heure-rupture.component';
import { TachesLivraisonComponent } from './components/taches-livraison/taches-livraison.component';
import { VoirTachesComponent } from './components/voir-taches/voir-taches.component';
import { VoirEquipesComponent } from './components/voir-equipes/voir-equipes.component';
import { AddEquipeComponent } from './components/add-equipe/add-equipe.component';
import { HeureRuptureComponent } from './components/heure-rupture/heure-rupture.component';
import { ModifyClientComponent } from './components/modify-client/modify-client.component';
import { ModifyFournisseurComponent } from './components/modify-fournisseur/modify-fournisseur.component';
import { Fournisseur } from './models/fournisseur';
import { NewFournisseurComponent } from './components/new-fournisseur/new-fournisseur.component';
import { ModifyBoulangerComponent } from './components/modify-boulanger/modify-boulanger.component';
import { VoirIngredientsComponent } from './components/voir-ingredients/voir-ingredients.component';
import { ModifyIngredientComponent } from './components/modify-ingredient/modify-ingredient.component';
import { ModifyProduitComponent } from './components/modify-produit/modify-produit.component';
import { VoirUnproduitComponent } from './components/voir-unproduit/voir-unproduit.component';
import { FournisseursComponent } from './components/fournisseurs/fournisseurs.component';
import { MessageComponent } from './components/message/message.component';
import { AddIngredientComponent } from './components/add-ingredient/add-ingredient.component';
import { EditorComponent } from './components/editor/editor.component';

export const routes: Routes = [
    {
      path: 'facture/:id',
      component: VoirUneFactureComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'client/:id',
      component: VoirUnClientComponent,
      canActivate: [AuthGuard],
    },
      {
      path: 'factures',
      component: VoirFacturesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'facturesParam',
      component: VoirFactureParamComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'facturesParam/:type_facture',
      component: VoirFactureParamComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'clientLogicielAdd',
      component: ClientLogicielAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'voirClientsLogiciel',
      component: VoirClientsLogicielComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'modifClientLogiciel',
      component: ModifyClientLogicielComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'voirClientsLogiciel/:id',
      component: VoirClientsLogicielComponent,
      canActivate: [AuthGuard],
    },
    // {
    //   path: 'factures/:paramKey',
    //   component: VoirFacturesComponent,
    //   canActivate: [AuthGuard],
    // },
    {
      path: 'clients',
      component: VoirClientsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'modifyClient',
      component: ModifyClientComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'boulanger',
      component: VoirBoulangeComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'modifyBoulangerie',
      component: ModifyBoulangerComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'message',
      component: MessageComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'newMessage',
      component: NewMessageComponent,
      canActivate: [AuthGuard],
    },
  
    {
      path: 'profile',
      component: UserProfileComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'protection',
      component: ProtectionRenseignementsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'nouveauClient',
      component: NewClientComponent,
      canActivate: [AuthGuard],
    },
    { path: 'nouveauClient/:boulanger', component: NewClientComponent },
    {
      path: 'aide',
      component: AideComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'joindre',
      component: JoindreComponent,

    },
    {
      path: 'logiciel',
      component: LogicielComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'siteFTP',
      component:   SiteFTPComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'cedule',
      component:   CeduleComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'commande',
      component:   CommandeComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'commandesWeb',
      component: CommandesWebComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'commandesWebTable',
      component: CommandeWebTableComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'recherche',
      component:   RechercheComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'production',
      component:     VoirProductionComponent
      ,
      canActivate: [AuthGuard],
    },
    {
      path: 'recettes',
      component:     VoirRecettesComponent
      ,
      canActivate: [AuthGuard],
    },
    {
      path: 'recettesMysql',
      component:     VoirRecettesMysqlComponent
      ,
      canActivate: [AuthGuard],
    },
    {
      path: 'recettesDrag',
      component:     VoirRecettesDragComponent
      ,
      canActivate: [AuthGuard],
    },
    {
      path: 'recettes/:dateProduction',
      component:     VoirRecettesComponent
      ,
      canActivate: [AuthGuard],
    },
    {
      path: 'livraison',
      component:     LivraisonComponent
      ,
      canActivate: [AuthGuard],
    },
    {
      path: 'rechercheClient',
      component: RechercheClientComponent
      ,
      canActivate: [AuthGuard],
    },
 
    {
      path: 'listeUser',
      component: ListComponent
      ,
      canActivate: [AuthGuard],
    },
    {
      path: 'goToFacturesPrimeNg',
      component: VoirFactureNgComponent
      ,
      canActivate: [AuthGuard],
    },
    {
      path: 'details',
      component: VoirDetailsComponent,
      canActivate: [AuthGuard],
    },
    
  
    { path: 'add', component: AddEditComponent,   
    canActivate: [AuthGuard] 
  },
    { path: 'edit/:id', component: AddEditComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'produits',
    component: VoirProduitsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'unProduit',
    component: VoirUnproduitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dateGraphic',
    component: VoirGraphicComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'selectDate',
    component: SelectDateRangeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientIndividuel',
    component: NomIndividuelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'rupture',
    component: AddHeureRuptureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'heureRupture',
    component: HeureRuptureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addTache',
    component: TachesLivraisonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'afficheTache',
    component: VoirTachesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'afficheEquipes',
    component: VoirEquipesComponent,
    canActivate: [AuthGuard],
  },
  
  {
    path: 'addEquipe',
    component: AddEquipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fournisseurs',
    component: FournisseursComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addFournisseurs',
    component: NewFournisseurComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modify_Fournisseur',
    component: ModifyFournisseurComponent,
    canActivate: [AuthGuard],
  },

    {
    path: 'ingredients',
    component:   VoirIngredientsComponent
    ,
    canActivate: [AuthGuard],
  },
  {
    path: 'modify_ingredient',
    component:   ModifyIngredientComponent
    ,
    canActivate: [AuthGuard],
  },
  {
    path: 'ajout_ingredient',
    component:     AddIngredientComponent
    ,
    canActivate: [AuthGuard],
  },


  {
    path: 'modify_produit',
    component:   ModifyProduitComponent
    ,
    canActivate: [AuthGuard],
  },
  {
    path: 'editor',
    component:   EditorComponent
    ,
    canActivate: [AuthGuard],
  },
  
    {
      path: 'error',
      component: PageErreurComponent,
    },
    {
      path: '',
      component: AccueilComponent,
      pathMatch: 'full',
    },
  ];
  
export { Routes };

