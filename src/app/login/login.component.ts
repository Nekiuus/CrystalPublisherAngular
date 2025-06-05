import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  codigo: string = '';
  clave: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.codigo || !this.clave) {
      this.error = 'Por favor ingrese código y clave';
      return;
    }

    this.error = '';
    this.isLoading = true;

    this.authService.login(this.codigo, this.clave).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Código o clave incorrectos';
      }
    });
  }
}