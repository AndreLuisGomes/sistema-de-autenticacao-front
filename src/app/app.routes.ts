import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () => import('./layouts/default-home-layout/default-home-layout.component').then(c => c.DefaultHomeLayoutComponent),
        data:{title: 'Home | Projeto'},
        children: [
        ],
    },
    {
        // falta implementar //
        path: 'imoveis',
        canActivate: [AuthGuard],
        loadComponent: () => import('./layouts/default-home-layout/default-home-layout.component').then(c => c.DefaultHomeLayoutComponent),
        data: { title: 'Casa Fácil' }
    },
    {
        path: 'auth',
        loadComponent: () => import('./layouts/auth-layout/default-auth-layout/default-auth-layout.component').then(m => m.DefaultAuthLayoutComponent),
        children: [
            {
                path: 'fazer-login',
                loadComponent: () => import('./layouts/auth-layout/default-auth-layout/login/login.component').then(m => m.LoginComponent),
                data: { title: 'Fazer Login' }
            },
            {
                path: 'criar-conta',
                loadComponent: () => import('./layouts/auth-layout/default-auth-layout/register/register.component').then(m => m.RegisterComponent),
                data: { title: 'Criar conta' }
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];