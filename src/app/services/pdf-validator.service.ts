// pdf-validator.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PdfValidatorService {
  sanitizer=inject(DomSanitizer)

  constructor(private http: HttpClient) {}

  validateAndOpenPdf(url: string): Observable<boolean> {
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);


    return this.http.head(url, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map((response: HttpResponse<any>) => {
        const contentType = response.headers.get('content-type');
        const isValid = contentType?.includes('application/pdf') || false;


        if (isValid) {

        //  window.open(this.sanitizer.sanitize(4, safeUrl) || '', '_blank');
          window.open(this.sanitizer.sanitize(4, safeUrl) || '', '_self');
        }
        return isValid;
      }),
      catchError(() => of(false))
    );
  }
}