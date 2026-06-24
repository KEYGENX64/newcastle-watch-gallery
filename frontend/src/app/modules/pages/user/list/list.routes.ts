import { Routes } from "@angular/router";
import { ListUserComponent } from "./list.component";

export default [
    {
        path: '',
        data: {
            "hasRoute": true
        },
        component: ListUserComponent,
    },
] as Routes;