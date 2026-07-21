import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RmApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  getCharacters(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

}