import { Routes } from '@angular/router';
import { UserChangeMyPasswordComponent } from './change-my-password.component';

export default [
    {
        path: '',
        data:{
            "hasRoute":true
        },
        component: UserChangeMyPasswordComponent,
    },
] as Routes;
