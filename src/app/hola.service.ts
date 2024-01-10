import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Saludo } from './models/saludo.interface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class HolaService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Saludo[]> {
    return this.http.get<Saludo[]>(this.apiUrl);
  }

  findOne(id: number): Observable<Saludo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Saludo>(url);
  }

  create(saludo: Saludo): Observable<Saludo> {
    return this.http.post<Saludo>(this.apiUrl, saludo);
  }

  update(id: number, saludo: Saludo): Observable<Saludo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Saludo>(url, saludo);
  }

  remove(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
