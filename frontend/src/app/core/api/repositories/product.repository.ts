import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { map, Observable } from "rxjs";
import { Pager } from "../models/pager.type";
import { ProductsRequest } from "../models/product/list/products.request.type";
import { ProductsResponse } from "../models/product/list/products.response.type";
import { UpdateProductRequest } from "../models/product/update/product.request.type";
import { UpdateProductResponse } from "../models/product/update/product.response.type";
import { AddProductRequest } from "../models/product/add/product.request.type";
import { AddProductResponse } from "../models/product/add/product.response.type";
import { DeleteProductResponse } from "../models/product/delete/products.response.type";
import { DeleteProductRequest } from "../models/product/delete/products.request.type";
import { ProductRequest } from "../models/product/single/product.request.type";
import { ProductResponse } from "../models/product/single/product.response.type";
import { DetailProductResponse } from "../models/product/detail/product.response.type";
import { DetailProductRequest } from "../models/product/detail/product.request.type";




@Injectable({
    providedIn: 'root',
})
export class ProductRepository {
    constructor(private api: ApiService) { }


    public List(request: ProductsRequest): Observable<Pager<ProductsResponse>> {
        return this.api.Products(request)
            .pipe(
                map((result: any) => {
                    return {
                        elements: result.data,
                        pagination: {
                            totalRecords: result.meta.total,
                            count: result.data.length,
                            totalPages: result.meta.last_page,
                            nextPage: result.meta.current_page < result.meta.last_page ? result.meta.current_page + 1 : result.meta.current_page,
                            previousPage: result.meta.current_page > 1 ? result.meta.current_page - 1 : 1,
                            lastPage: result.meta.last_page,
                            pageSize: result.meta.per_page,
                            currentPage: result.meta.current_page,
                        }
                    }
                })
            );
    }
    public Single(request: ProductRequest): Observable<ProductResponse> {
        return this.api.Product(request).pipe(
            map(x => x.data)
        );



    }
    public Detail(request: DetailProductRequest): Observable<DetailProductResponse> {
        return this.api.DetailProduct(request).pipe(
            map(x => x.data)
        );


    }
    public Update(request: UpdateProductRequest): Observable<UpdateProductResponse> {
        return this.api.UpdateProduct(request);
    }
    public Add(request: AddProductRequest): Observable<AddProductResponse> {
        return this.api.AddProduct(request);
    }
    public Delete(request: DeleteProductRequest): Observable<DeleteProductResponse> {
        return this.api.DeleteProduct(request);
    }
}