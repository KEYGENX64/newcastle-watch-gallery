import { Routes } from "@angular/router";
import { ListCategoryComponent } from "./list.component";

export default [
    {
        path: '',
        data: {
            "hasRoute": true
        },
        component: ListCategoryComponent,
    },
] as Routes;