import { Routes } from "@angular/router";
import { AddCategoryComponent } from "./add.component";

export default [
    {
        path: '',
        data: {
            "hasRoute": true
        },
        component: AddCategoryComponent,
    },
] as Routes;