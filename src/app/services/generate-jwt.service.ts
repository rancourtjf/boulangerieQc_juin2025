import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as Base64 from 'base-64';


@Injectable({
  providedIn: 'root'
})
export class GenerateJWTService {
  private secretKey = 'votre_cle_secrete';

  constructor() { }

  generateToken(payload: object, expiresIn: number): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const exp = Math.floor(Date.now() / 1000) + expiresIn; // Calcul de l'expiration en secondes
    const payloadWithExp = { ...payload, exp }; // Ajout de l'expiration au payload

    const stringifiedHeader = JSON.stringify(header);
    const encodedHeader = Base64.encode(stringifiedHeader);

    const stringifiedPayload = JSON.stringify(payloadWithExp);
    const encodedPayload = Base64.encode(stringifiedPayload);

    const signature = this.sign(encodedHeader + '.' + encodedPayload, this.secretKey);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  private sign(data: string, secret: string): string {
    return CryptoJS.HmacSHA256(data, secret).toString(CryptoJS.enc.Base64)
      .replace(/=+$/, '') // Remove any trailing '='
      .replace(/\+/g, '-') // Replace '+' with '-'
      .replace(/\//g, '_'); // Replace '/' with '_'
  }
  // jwt.service.ts
// Ajoutez ces méthodes au service existant

verifyToken(token: string): boolean {
  const [header, payload, signature] = token.split('.');

  const data = `${header}.${payload}`;
  const newSignature = this.sign(data, this.secretKey);

  if (signature !== newSignature) {
    return false;
  }

  const decodedPayload = JSON.parse(Base64.decode(payload));
  const currentTime = Math.floor(Date.now() / 1000);


  return decodedPayload.exp > currentTime; // Vérifie si le token a expiré
}

decodeToken(token: string): object | null {
  if (!this.verifyToken(token)) {
    return null;
  }

  const payload = token.split('.')[1];
  const decodedPayload = Base64.decode(payload);
  return JSON.parse(decodedPayload);
}
}
