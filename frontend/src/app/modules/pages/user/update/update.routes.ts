import { Routes } from "@angular/router";
import { UpdateUserComponent } from "./update.component";

export default [
    {
        path: ':id',
        data: {
            "hasRoute": true
        },
        component: UpdateUserComponent,
    },
] as Routes;