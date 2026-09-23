import { Routes } from '@angular/router';

import { PublicRoutingComponent } from './public-routing/public-routing.component';
import { LoginComponent } from './public-routing/login/login.component';
import { RegisterComponent } from './public-routing/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'prefix'
    },
    {
        path: 'auth',
        component: PublicRoutingComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'prefix'
            },
            {
                path: 'login',
                component: LoginComponent,
                title: 'Login'
            },
            {
                path: 'register',
                component: RegisterComponent,
                title: 'Cadastrar'
            }
        ]
    }
];
