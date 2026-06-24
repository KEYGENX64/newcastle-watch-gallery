import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { LaravelPager } from "./models/pager.type";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductsResponse } from "./models/product/list/products.response.type";
import { ProductsRequest } from "./models/product/list/products.request.type";
import { AddProductRequest } from "./models/product/add/product.request.type";
import { AddProductResponse } from "./models/product/add/product.response.type";
import { UpdateProductRequest } from "./models/product/update/product.request.type";
import { UpdateProductResponse } from "./models/product/update/product.response.type";
import { DeleteProductResponse } from "./models/product/delete/products.response.type";
import { DeleteProductRequest } from "./models/product/delete/products.request.type";
import { CategoriesRequest } from "./models/category/list/categories.request.type";
import { CategoriesResponse } from "./models/category/list/categories.response.type";
import { CategoryRequest } from "./models/category/detail/category.request.type";
import { CategoryResponse } from "./models/category/detail/category.response.type";
import { AddCategoryRequest } from "./models/category/add/category.request.type";
import { AddCategoryResponse } from "./models/category/add/category.response.type";
import { UpdateCategoryRequest } from "./models/category/update/category.request.type";
import { UpdateCategoryResponse } from "./models/category/update/category.response.type";
import { DeleteCategoryRequest } from "./models/category/delete/category.request.type";
import { DeleteCategoryResponse } from "./models/category/delete/category.response.type";
import { Result } from "./models/empty-result.type";
import { UsersRequest } from "./models/user/list/user.request";
import { UsersResponse } from "./models/user/list/user.response";
import { UserRequest } from "./models/user/detail/user.request";
import { UserResponse } from "./models/user/detail/user.response";
import { AddUserRequest } from "./models/user/add/user.request";
import { AddUserResponse } from "./models/user/add/user.response";
import { UpdateUserRequest } from "./models/user/update/user.request";
import { UpdateUserResponse } from "./models/user/update/user.response";
import { DeleteUserRequest } from "./models/user/delete/user.request";
import { DeleteUserResponse } from "./models/user/delete/user.response";
import { ChangeUserPasswordResponse } from "./models/user/change/password/user.response";
import { ChangeUserPasswordRequest } from "./models/user/change/password/user.request";
import { UpdateProfileRequest } from "./models/user/update profile/user.request";
import { UpdateProfileResponse } from "./models/user/update profile/user.response";
import { ProfileRequest } from "./models/user/profile/user.request";
import { ProfileResponse } from "./models/user/profile/user.response";
import { ChangeMyPasswordRequest } from "./models/user/change/my-password/user.request";
import { ChangeMyPasswordResponse } from "./models/user/change/my-password/user.response";
import { ProductRequest } from "./models/product/single/product.request.type";
import { ProductResponse } from "./models/product/single/product.response.type";
import { DetailProductRequest } from "./models/product/detail/product.request.type";
import { DetailProductResponse } from "./models/product/detail/product.response.type";



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    private Url: string = environment.server + '/api/';

    private get<T>(url: string) {
        return this.http.get<T>(this.Url + url, this.httpOptions);
    }

    private getData<T>(url: string, params: any) {
        const cleanedParams = this.cleanParams(params);
        return this.http.get<T>(this.Url + url, { ...this.httpOptions, params: cleanedParams });
    }
    private post<T>(url: string, data: any = "") {
        const cleanedParams = this.cleanParams(data);
        return this.http.post<T>(this.Url + url, cleanedParams, this.httpOptions);
    }
    private delete<T>(url: string) {
        return this.http.delete<T>(this.Url + url, this.httpOptions);
    }
    private deleteData<T>(url: string, params: any) {
        const cleanedParams = this.cleanParams(params);
        return this.http.delete<T>(this.Url + url, { ...this.httpOptions, body: cleanedParams });
    }
    private put<T>(url: string, data: any = "") {
        const cleanedParams = this.cleanParams(data);
        return this.http.put<T>(this.Url + url, cleanedParams, this.httpOptions);
    }
    private cleanParams(params: any): any {
        if (!params) return {};
        const cleaned: any = {};
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const value = params[key];
                // اگر مقدار null یا undefined نبود، نگه دار
                if (value !== null && value !== undefined) {
                    cleaned[key] = value;
                }
            }
        }
        return cleaned;
    }
    private formPost<T>(url: string, data: any = "") {
        return this.http.post<T>(this.Url + url, data);
    }
    public Products(request: ProductsRequest): Observable<LaravelPager<ProductsResponse>> {
        return this.getData<LaravelPager<ProductsResponse>>("products", {
            per_page: request.pageSize.toString(), // تعداد آیتم در هر صفحه (مثلا ۱۵)
            page: request.currentPage.toString()   // اصلاح شد: لاراول منتظر کلمه page است
        });
    }
    public Product(request: ProductRequest): Observable<Result<ProductResponse>> {
        return this.get<Result<ProductResponse>>(`products/${request.id}`);
    }
    public DetailProduct(request: DetailProductRequest): Observable<Result<DetailProductResponse>> {
        return this.get<Result<DetailProductResponse>>(`products/detail/${request.id}`);
    }
    public AddProduct(request: AddProductRequest): Observable<AddProductResponse> {
        let formData = new FormData();
        formData.append("image", request.image, request.image.name);
        formData.append("category_id", request.category_id.toString());
        formData.append("name", request.name.toString());
        formData.append("brand", request.brand.toString());
        formData.append("sku", request.sku.toString());
        formData.append("price", request.price.toString());
        formData.append("discount_price", request.discount_price.toString());
        formData.append("description", request.description.toString());
        formData.append("gender", request.gender.toString());
        formData.append("movement_type", request.movement_type.toString());
        formData.append("stock", request.stock.toString());


        return this.formPost<AddProductResponse>('products', formData);
    }
    public UpdateProduct(request: UpdateProductRequest): Observable<UpdateProductResponse> {

        return this.put<UpdateProductResponse>(`products/${request.id}`, request);

    }
    public DeleteProduct(request: DeleteProductRequest): Observable<DeleteProductResponse> {
        return this.delete<DeleteProductResponse>(`products/${request.id}`);

    }


    public Categories(request: CategoriesRequest): Observable<LaravelPager<CategoriesResponse>> {
        return this.getData<LaravelPager<CategoriesResponse>>("categories", {
            per_page: request.pageSize.toString(),
            page: request.currentPage.toString()
        });
    }
    public Category(request: CategoryRequest): Observable<Result<CategoryResponse>> {
        return this.get<Result<CategoryResponse>>(`categories/${request.id}`);
    }
    public AddCategory(request: AddCategoryRequest): Observable<AddCategoryResponse> {
        return this.post<AddCategoryResponse>('categories', request);
    }
    public UpdateCategory(request: UpdateCategoryRequest): Observable<UpdateCategoryResponse> {
        return this.put<UpdateCategoryResponse>(`categories/${request.id}`, request);

    }
    public DeleteCategory(request: DeleteCategoryRequest): Observable<DeleteCategoryResponse> {
        return this.delete<DeleteCategoryResponse>(`categories/${request.id}`);

    }


    public Users(request: UsersRequest): Observable<LaravelPager<UsersResponse>> {
        return this.getData<LaravelPager<UsersResponse>>("users", {
            per_page: request.pageSize.toString(),
            page: request.currentPage.toString()
        });
    }
    public User(request: UserRequest): Observable<Result<UserResponse>> {
        return this.get<Result<UserResponse>>(`users/${request.id}`);
    }
    public AddUser(request: AddUserRequest): Observable<Result<AddUserResponse>> {
        return this.post<Result<AddUserResponse>>('users', request);
    }
    public UpdateUser(request: UpdateUserRequest): Observable<Result<UpdateUserResponse>> {

        return this.put<Result<UpdateUserResponse>>(`users/${request.id}`, request);

    }
    public DeleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse> {
        return this.delete<DeleteUserResponse>(`users/${request.id}`);

    }
    public ChangeMyPassword(request: ChangeMyPasswordRequest): Observable<ChangeMyPasswordResponse> {
        return this.post<ChangeMyPasswordResponse>("change-mypassword", request);

    }
    public ProfileUser(request: ProfileRequest): Observable<Result<ProfileResponse>> {
        return this.getData<Result<ProfileResponse>>('profile', request);
    }
    public UpdateProfileUser(request: UpdateProfileRequest): Observable<Result<UpdateProfileResponse>> {

        return this.put<Result<UpdateProfileResponse>>('profile', request);

    }
    public ChangePassword(request: ChangeUserPasswordRequest): Observable<ChangeUserPasswordResponse> {
        return this.post<ChangeUserPasswordResponse>(`users/${request.id}/change-password`, request);

    }
}