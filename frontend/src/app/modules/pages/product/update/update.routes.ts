import { Routes } from "@angular/router";
import { UpdateProductComponent } from "./update.component";

export default [
    {
        path: ':id',
        data: {
            "hasRoute": true
        },
        component: UpdateProductComponent,
    },
] as Routes;