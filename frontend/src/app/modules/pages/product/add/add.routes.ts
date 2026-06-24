import { Routes } from "@angular/router";
import { AddProductComponent } from "./add.component";

export default [
    {
        path: '',
        data: {
            "hasRoute": true
        },
        component: AddProductComponent,
    },
] as Routes;