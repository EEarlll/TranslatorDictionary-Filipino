import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor() {}

  async submitApplication(
    src: string,
    dst: string,
    text: string
  ): Promise<{ message: string }> {
    console.log(`${src} , ${dst} , ${text}`);
    let url = `https://translator-filipino.vercel.app/translate/${src}/${dst}/${text}`;
    const response = await fetch(url);
    const data = await response.json();
    return data ?? {};
  }
}
