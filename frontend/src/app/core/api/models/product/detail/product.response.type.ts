import { LookupResponse } from "app/component/form-builder/form-schema.model";

export interface DetailProductResponse {
        id: number;
        name: string;
        brand: string;
        sku: string | null;
        price: number;
        discount_price: number | null;
        description: string | null;
        image: string | null;
        gender: string | null;
        movement_type: string | null;
        stock: number;
        category: LookupResponse | null;
        created_at: string;
}