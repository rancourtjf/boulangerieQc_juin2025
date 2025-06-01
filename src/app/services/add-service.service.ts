
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddServiceService {

  constructor() { }

  // Fonction pour calculer la somme d'une propriété spécifique dans un tableau d'objets
 // sumProperty(items: { [key: string]: any }[], property: string): Observable<number> {
    sumProperty(items: { [key: string]: any }[], property: string): Observable<number> {

    return from(items).pipe(
      map(item => item[property]),
      reduce((acc, curr) => acc + curr, 0)
    );
  }
}

