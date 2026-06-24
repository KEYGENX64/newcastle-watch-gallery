import { Routes } from "@angular/router";
import { ListProductComponent } from "./list.component";

export default [
    {
        path: '',
        data: {
            "hasRoute": true
        },
        component: ListProductComponent,
    },
] as Routes;