import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { map, Observable } from "rxjs";
import { CategoriesRequest } from "../models/category/list/categories.request.type";
import { CategoriesResponse } from "../models/category/list/categories.response.type";
import { Pager } from "../models/pager.type";
import { CategoryRequest } from "../models/category/detail/category.request.type";
import { CategoryResponse } from "../models/category/detail/category.response.type";
import { UpdateCategoryRequest } from "../models/category/update/category.request.type";
import { UpdateCategoryResponse } from "../models/category/update/category.response.type";
import { AddCategoryRequest } from "../models/category/add/category.request.type";
import { AddCategoryResponse } from "../models/category/add/category.response.type";
import { DeleteCategoryRequest } from "../models/category/delete/category.request.type";
import { DeleteCategoryResponse } from "../models/category/delete/category.response.type";




@Injectable({
    providedIn: 'root',
})
export class CategoryRepository {
    constructor(private api: ApiService) { }


    public List(request: CategoriesRequest): Observable<Pager<CategoriesResponse>> {
        return this.api.Categories(request)
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
    public Detail(request: CategoryRequest): Observable<CategoryResponse> {
        return this.api.Category(request).pipe(
            map(x => x.data)
        );


    }
    public Update(request: UpdateCategoryRequest): Observable<UpdateCategoryResponse> {
        return this.api.UpdateCategory(request);
    }
    public Add(request: AddCategoryRequest): Observable<AddCategoryResponse> {
        return this.api.AddCategory(request);
    }
    public Delete(request: DeleteCategoryRequest): Observable<DeleteCategoryResponse> {
        return this.api.DeleteCategory(request);
    }
}