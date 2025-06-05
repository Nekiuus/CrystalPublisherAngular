import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FormsModule,
  ],
  template: `
    <app-navbar *ngIf="router.url !== '/login'"></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public router: Router) {}
}
