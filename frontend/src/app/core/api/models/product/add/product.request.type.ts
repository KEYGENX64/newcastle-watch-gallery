export interface AddProductRequest{
    category_id:number;
    name:string;
    brand:string;
    sku:string;
    price:number;
    discount_price:number;
    description:string;
    image:File;
    gender:string;
    movement_type:string;
    stock:number;
}