import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformObjectToStreamService {

  constructor() { }
    // Transformer un objet en stream
    transformObjectToStream<T>(obj: T): Observable<T> {
      return from([obj]);
    }
}
