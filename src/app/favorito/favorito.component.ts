// favorito.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritoService } from '../services/favorito.service';

@Component({
  selector: 'app-favorito',
  standalone: true,
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.css'],
  imports: [CommonModule, FormsModule]
})
export class FavoritoComponent implements OnInit {
  favorito = { usuarioId: 0, libroId: 0 };
  favoritos: any[] = [];

  constructor(private favoritoService: FavoritoService) {}

  ngOnInit(): void {
    this.loadFavoritos();
  }

  loadFavoritos(): void {
    this.favoritoService.getAll().subscribe({
      next: (data) => this.favoritos = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    this.favoritoService.create(this.favorito).subscribe({
      next: () => {
        alert('Favorito guardado');
        this.loadFavoritos();
      },
      error: () => alert('Error al guardar favorito')
    });
  }
}
