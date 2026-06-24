export interface UpdateProductRequest {
    id: number;
    category_id: number;
    name: string;
    brand: string;
    sku: string;
    price: number;
    discount_price: number;
    description: string;
    gender: string;
    movement_type: string;
    stock: number;
}