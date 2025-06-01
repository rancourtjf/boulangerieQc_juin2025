
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codepostal'
})
export class CodePostalFormatPipe implements PipeTransform {
  transform(codepostalData: string): string {
    if (!codepostalData) return '';
    
    // Supprime tous les caractères non numériques
    const cleaned = codepostalData.replace(/\D/g, '');
    
    // Format français : XX XX XX XX XX
   // const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})(\d{2})(\d{2})$/);
    const match = cleaned.match(/^(\d{3})(\d{3})$/);
    
    if (match) {
     // return match.slice(1).join('-');
      return `${match[1]}-${match[2]}}`;
    }
    
    return codepostalData; // Retourne le code postal quel si le format ne correspond pas
  }
}