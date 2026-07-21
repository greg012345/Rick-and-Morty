import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Army } from '../models/army';


@Injectable({
    providedIn: 'root'
})

export class Chaservice {
    private apiUrl = "https://localhost:7185/api/Enmployye"
    constructor(
        private http: HttpClient
    ) { }

    getchars(): Observable<Army[]> {
        return this.http.get<Army[]>(this.apiUrl);
    }

    getcharsById(id: number): Observable<Army> {
        return this.http.get<Army>(this.apiUrl + '/' + id);
    }

    newChars(char: Army): Observable<void> {
        return this.http.post<void>(this.apiUrl, char);
    }

    deleteChar(id: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl + '/' + id)
    }

    editChar(id: number, char: Army): Observable<void> {
        return this.http.put<void>(this.apiUrl + '/' + id, char);
    }

}
