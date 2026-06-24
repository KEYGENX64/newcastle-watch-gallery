import { Routes } from '@angular/router';
import { UserChangePasswordComponent } from './change-password.component';

export default [
    {
        path: ':id',
        data: {
            "hasRoute": true
        },
        component: UserChangePasswordComponent,
    },
] as Routes;
