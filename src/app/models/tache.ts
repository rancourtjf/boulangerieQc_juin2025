
export interface Tache {
    ID ?: number,
    descriptif: string,
    datePrevue: Date,
    dateDebut:Date,
    dateFin:Date,
    jourSemaine: string,
    nomEquipe: string,
    timestamp: Date,
    timeStampFait?: Date,
    initiales: string,
    fait: boolean
}