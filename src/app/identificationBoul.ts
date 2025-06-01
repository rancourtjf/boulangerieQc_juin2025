export class Boulanger {
    emailClient:string
    courriel?:string
    emailUserWeb?:string
    nom!: string;
    idclient:number;
    userURLSiteFTP!:string;
    userURLSiteCommande!:string;
    clientIndivSiteCommande?:string
    emailEnvoiAuBoulanger!:string
    identifiant!:string
    passwordHash!:string
    dossierCommandesWeb!:string
    db_host?:string
    db_name?:string
    db_username?:string
    db_password?:string
    nomBoulangerie?:string
    logoBoulangerie!:string
    role!:string
    logoSignal?:string

    proprioBoulangerie?:boolean
    accesSMS?:boolean
    noCellSMS?:string
    nomEquipe?:string
    outilsGestion?:boolean
    projetSherbrooke?:string
    frais_transport?:number
    activation_Frais_transport?:boolean
    qteMincommande?:number
    achat_minimum_sans_frais?:number
    version?:string
    commercial?:boolean
    cueillette?:string
    timestampNewCommande?:Date

}