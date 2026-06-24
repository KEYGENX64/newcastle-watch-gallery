import { Routes } from "@angular/router";
import { AddUserComponent } from "./add.component";

export default [
    {
        path: '',
        data: {
            "hasRoute": true
        },
        component: AddUserComponent,
    },
] as Routes;