export interface Recette {
  production: boolean;
  id?: number;
  chemin?: string;
  nomDoument?:string;
  dateProd?: Date;
  categorie?: string;
  idProd?: number;
  timestamp: Date;
}
