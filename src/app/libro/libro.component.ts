import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/Libro';
import { LibroService } from '../services/libro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-libro',
  standalone: true,
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LibroComponent implements OnInit {
  libros: Libro[] = [];
  errorMessage: string | null = null;

  filtro: string = '';
  editando: boolean = false;
  libroForm: Libro = {
    id: 0,
    titulo: '',
    genero: '',
    descripcion: '',
    tipoLibro: '',
    precio: 0
  };

  modal: any;

  constructor(
    private libroService: LibroService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (data: Libro[]) => { // <-- Tipo explícito
        this.libros = data;
        this.errorMessage = null;
        console.log('Libros recibidos:', data);
      },
      error: (err: any) => { // <-- Tipo explícito
        this.errorMessage = 'Error al cargar los libros';
        console.error('Error:', err);
      }
    });
  }

  filtrarLibros(): Libro[] {
    const filtroLower = this.filtro.toLowerCase();
    return this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(filtroLower) ||
      libro.genero.toLowerCase().includes(filtroLower)
    );
  }

  abrirFormulario(libro?: Libro) {
    this.editando = !!libro;
    this.libroForm = libro
      ? { ...libro }
      : { id: 0, titulo: '', genero: '', descripcion: '', tipoLibro: '', precio: 0 };
    const modalElement = document.getElementById('modalFormulario');
    this.modal = new bootstrap.Modal(modalElement);
    this.modal.show();
  }

  guardarLibro() {
    if (this.editando) {
      this.libroService.update(this.libroForm.id, this.libroForm).subscribe(() => {
        this.getLibros();
        this.modal.hide();
      });
    } else {
      this.libroService.create(this.libroForm).subscribe(() => {
        this.getLibros();
        this.modal.hide();
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.libroService.delete(id).subscribe(() => this.getLibros());
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
