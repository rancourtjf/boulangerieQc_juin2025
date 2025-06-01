
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    if (!phoneNumber) return '';
    
    // Supprime tous les caractères non numériques
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format français : XX XX XX XX XX
   // const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})(\d{2})(\d{2})$/);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
      return match.slice(1).join('-');
    }
    
    return phoneNumber; // Retourne le numéro tel quel si le format ne correspond pas
  }
}