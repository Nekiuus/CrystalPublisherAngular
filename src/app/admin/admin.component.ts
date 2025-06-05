// admin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminComponent implements OnInit {
  admin = { nombre: '', correo: '' };
  admins: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.adminService.getAll().subscribe({
      next: (data) => this.admins = data,
      error: (err) => console.error('Error al cargar admins', err)
    });
  }

  onSubmit(): void {
    this.adminService.create(this.admin).subscribe({
      next: () => {
        alert('Admin creado');
        this.loadAdmins();
      },
      error: () => alert('Error al crear admin')
    });
  }
}
