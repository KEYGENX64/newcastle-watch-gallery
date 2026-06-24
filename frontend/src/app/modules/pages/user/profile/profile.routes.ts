import { Routes } from '@angular/router';
import { UserProfileComponent } from './profile.component';

export default [
    {
        path     : '',
        data:{
            "hasRoute":true
        },
        component: UserProfileComponent,
    },
] as Routes;
