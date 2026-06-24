import { Routes } from "@angular/router";
import { ProductDetailComponent } from "./product-detail.component";

export default [
    {
        path: ':id',
        data: {
            "hasRoute": true
        },
        component: ProductDetailComponent,
    },
] as Routes;