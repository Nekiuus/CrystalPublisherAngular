import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Libro } from '../models/Libro';

interface LibroApiModel {
  sql?: number;
  id: number;
  titulo: string;
  genero: string;
  descripcion: string;
  tipoLibro: string;
  precio: number;
}

@Injectable({ providedIn: 'root' })
export class LibroService {
  private apiUrl = 'http://localhost:5000/api/Libro';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<LibroApiModel[] | { data: LibroApiModel[] }>(this.apiUrl).pipe(
      map((response: any) => {
        const libros: LibroApiModel[] = Array.isArray(response)
          ? response
          : response?.data;

        if (!libros || !Array.isArray(libros)) {
          throw new Error('La respuesta del servidor no tiene un formato válido');
        }

        return libros.map((item: LibroApiModel): Libro => ({
          id: item.id ?? item.sql ?? 0,
          titulo: item.titulo,
          genero: item.genero,
          descripcion: item.descripcion,
          tipoLibro: item.tipoLibro,
          precio: item.precio
        }));
      }),
      catchError(error => {
        console.error('Error al obtener libros:', error);
        return throwError(() => new Error('Error al obtener libros'));
      })
    );
  }

  create(data: Libro): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: Libro): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
