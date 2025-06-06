import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { FavoritoComponent } from './favorito/favorito.component';
import { LibroComponent } from './libro/libro.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth/auth.guard';
import { NosotrosComponent } from './nosotros/nosotros.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'favorito', component: FavoritoComponent },
  { path: 'libro', component: LibroComponent },
   {path: 'nosotros', component:NosotrosComponent },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
  // Ruta comodín para no encontradas
];
