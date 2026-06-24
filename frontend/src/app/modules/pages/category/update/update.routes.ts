import { Routes } from "@angular/router";
import { UpdateCategoryComponent } from "./update.component";

export default [
    {
        path: ':id',
        data: {
            "hasRoute": true
        },
        component: UpdateCategoryComponent,
    },
] as Routes;