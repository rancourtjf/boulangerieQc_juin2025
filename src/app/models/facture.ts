export interface Facture {
    id: number,
    idclient: number,
    id_commande?:number,
    type_facture?:string,
    dateProd:Date,
    montant?:number,
    livree?:boolean,
    date_livraison?:Date,
    heure_livraison?:Date,
    date_paiement?:Date,
    id_facture?:number,
    nom_facture?:string,
    jourdelasemaine?:string,
    timeStamp?:any,
    url_facture?:string,
    total_est_paye?:boolean
  }
  