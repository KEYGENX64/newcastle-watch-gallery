import { Routes } from '@angular/router';
import { InformationComponent } from './information.component';

export default [
    { path: '', pathMatch: 'full', redirectTo: 'product/list' },

    {
        path: '',
        component: InformationComponent,
        children: [
            {
                path: 'category/add',
                loadChildren: () => import('app/modules/pages/category/add/add.routes')
            },
            {
                path: 'category/edit',
                loadChildren: () => import('app/modules/pages/category/update/update.routes')
            },
            {
                path: 'category/list',
                loadChildren: () => import('app/modules/pages/category/list/list.routes')
            },

            {
                path: 'user/add',
                loadChildren: () => import('app/modules/pages/user/add/add.routes')
            },
            {
                path: 'user/edit',
                loadChildren: () => import('app/modules/pages/user/update/update.routes')
            },
            {
                path: 'user/list',
                loadChildren: () => import('app/modules/pages/user/list/list.routes')
            },
            {
                path: 'user/profile',
                loadChildren: () => import('app/modules/pages/user/profile/profile.routes')
            },
            {
                path: 'user/change-mypassword',
                loadChildren: () => import('app/modules/pages/user/change-my-password/change-my-password.routes')
            },
            {
                path: 'product/add',
                loadChildren: () => import('app/modules/pages/product/add/add.routes')
            },

            {
                path: 'product/edit',
                loadChildren: () => import('app/modules/pages/product/update/update.routes')
            },
            {
                path: 'product/detail',
                loadChildren: () => import('app/modules/pages/product/detail/product-detail.routes')
            },
            {
                path: 'product/list',
                loadChildren: () => import('app/modules/pages/product/list/list.routes')
            }
        ]
    },
] as Routes;
