// usuario.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UsuarioComponent implements OnInit {
  usuario = { nombre: '', email: '' };
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    this.usuarioService.create(this.usuario).subscribe({
      next: () => {
        alert('Usuario guardado');
        this.loadUsuarios();
      },
      error: () => alert('Error al guardar usuario')
    });
  }
}
