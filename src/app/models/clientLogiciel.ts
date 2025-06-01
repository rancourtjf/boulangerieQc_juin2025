export interface ClientLogiciel {
  id:number;
  nomBoulangerie: string;
  courriel: string;
  actifBoolean:boolean;
  prenom: string;
  nomFamille: string;
  telephone: string;
  rue: string;
  ville: string;
  codePostal: string;
  dateDebut: Date;
  dateFin: Date;
  identifiant: string;
  logoBoulangerie: string;
  emailEnvoiAuBoulanger: string;
  dossierCommandesWeb:string
  host: string,
  user: string,
  password: string,
  logfile: string,
  port: number,
  //
  serveurFTP: string,
  userFTP: string,
  passwordFTP: string,
  site_web_documents: string,
  user_site_web: string,
  //
  pwd_site_web: string,
  serveurFTP_bkup: string,
  userFTP_bkup: string,
  pwdFTPbkup: string,
  dataFile4DD: string,
  //
  dataFile4DIndx: string,
  depotListePrixClients: string,
  userFTPDepot: string,
  pwdFTPDepot: string,
  serveurFTPListePrixClients: string,
  //
  serveurFTPSansFTP: string,
  passwordFTPHash: string,
  serveurFTPSansFTP_bkup: string,
  pwdFTPbkup_Hash: string,
  db_host_mysql: string,
  //
  db_name_mysql: string,
  db_username_mysql: string,
  db_password_mysql: string,
  repertoireBoulangerie: string,
  db_host_mysql_boulangerieqc: string,
  //
  db_name_mysql_boulangerieqc: string,
  db_username_mysql_boulangerieqc: string,
  db_password_mysql_boulangerieqc: string,
  suiviDeProjetGoogle: string,

}
