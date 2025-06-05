import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/Admin/login'; // URL del endpoint de autenticación
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(codigo: string, clave: string): Observable<any> {
    return this.http.post<{ token: string }>(this.apiUrl, { codigo, clave }).pipe(
      tap({
        next: (response) => {
          const token = response.token;
          if (token) {
            localStorage.setItem(this.tokenKey, token);
          }
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
