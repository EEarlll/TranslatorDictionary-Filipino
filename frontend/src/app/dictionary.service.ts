import { Injectable } from '@angular/core';
import { Dictionary } from './dictionary';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  url = 'https://translator-filipino.vercel.app/dictionary';

  constructor() {}

  async getAll(
    type: string,
    limit: number = 10,
    offset: number
  ): Promise<Dictionary[]> {
    const response = await fetch(
      `${this.url}?id=${type}&limit=${limit}&offset=${offset}`
    );

    const data = await response.json();
    return data;
  }

  async getSearched(
    word: string,
    type?: string,
    limit = 1,
    offset = 0
  ): Promise<Dictionary[]> {
    console.log(word);
    const fetchUrl = `${this.url}/${word}?limit=${limit}&offset=${offset}`;
    const response = await fetch(type ? `${fetchUrl}&id=${type}` : fetchUrl);
    const data = await response.json();
    return data;
  }

  async PutExample(id: number, example: string, created_by: string) {
    const bodyData = {
      id: id,
      example: example,
      created_by: created_by,
    };
    console.log(bodyData);

    const response = await fetch(`${this.url}/add-example`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
    const data = await response.json();
    return data;
  }
}
