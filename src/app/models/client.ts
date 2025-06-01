import { Time } from "@angular/common"
import { Timestamp } from "rxjs"

export interface Client {
    id?: number,
    idclient?: number,
    nom?:string,
    adresse?:string
    ville?:string,
    codepostal?:string,
    courriel?:string,
    telephone?:string,
    googlemap?:string,
    timestampNewCommande?:Date
    nomBoulangerie?: string
  actif?:boolean

  }
  