export interface Detail {
    produit: any
    client: any
    value: number
    id:number,
    id_detail:number,
    id_production:number,
    id_client: number,
    nom_client?:string,
    nom_produit:string,
    id_produit:number,
    quantite:number,
    date_prod:Date,
    no_jour:number,
    jour_semaine:string,
    nom_pate:string,
    id_recette:number,
    poids_pate:number,
    cout_pate:number,
    prix_boutique:number,
    prix_escompte:number,
    invendus:boolean,
    tot_non_taxable:number
    tot_taxable:number,
    tps:number,
    tvq:number,
    total_vente:number,
    id_commande:number,
    id_recettesec_main:number,
    timeStamp?:any,
    clientRegroupement:boolean
  }
  