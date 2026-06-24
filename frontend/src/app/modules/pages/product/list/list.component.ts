import { Component } from '@angular/core';
import { FormControlComponent } from 'app/component/form-control.component';
import { PageChangeEvent } from 'app/component/table/page-change.event';
import { TableComponent } from 'app/component/table/table.component';
import { Table } from 'app/component/table/table.type';
import { Role } from 'app/core/api/enums/role.enums.type';
import { Pager } from 'app/core/api/models/pager.type';
import { ProductsResponse } from 'app/core/api/models/product/list/products.response.type';
import { ProductRepository } from 'app/core/api/repositories/product.repository';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ProductCardComponent } from '../card/product-card.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'list-product',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    imports: [TableComponent, ProductCardComponent, CommonModule, MatPaginatorModule]
})
export class ListProductComponent extends FormControlComponent<ListProductComponent, any> {
    constructor(private readonly _repository: ProductRepository, private readonly _userService: UserService) {
        super();
        _userService.user$.subscribe(us => {
            this.user = us;
        })
    }
    _pageChangeEvent = {
        length: 0,
        pageSize: 15,
        pageIndex: 0, // مبنای صفر برای متریال
        pageSizeOptions: [15, 20, 50, 100],
        showFirstLastButtons: true,
        sort: undefined,
        filter: []
    }

    onHandlePageEvent(event: any) {
        // ۱. ابتدا مقادیر محلی را با انتخاب کاربر به‌روزرسانی می‌کنیم
        this._pageChangeEvent.pageSize = event.pageSize;
        this._pageChangeEvent.pageIndex = event.pageIndex;

        // ۲. محاسبه صفحه هدف برای لاراول (صفحه متریال از 0 است پس باید + 1 شود)
        const targetPageForLaravel = event.pageIndex + 1;

        // ۳. درخواست دیتای جدید از سرور
        this.loadProducts(targetPageForLaravel, event.pageSize);
    }
    user: User;
    products: ProductsResponse[] = [];

    get isAdmin(): boolean {
        return this.user?.role?.includes(Role.Admin) ?? false;
    }
    config: Table = {
        displayedColumns: ['name', 'brand', 'sku', { name: 'price', type: "price" }, 'discount_price', 'description', { name: 'image', type: 'image' }, { name: 'gender', type: 'sex' }, 'movement_type', 'stock', 'category', { name: 'created_at', type: 'date' }],
        update: (event) => this.onLoad(event),
        actions: [{
            name: "Delete",
            show: (item) => this.user.role.includes(Role.Admin),
            icon: "mat_solid:delete",
            on: (item: ProductsResponse) => this._repository.Delete({ id: item.id }).pipe(
                switchMap(x => of(true)),
                catchError(x => of(false))
            )
        },
        {
            name: "Edit",
            icon: "mat_solid:edit",
            show: (item) => this.user.role.includes(Role.Admin),
            on: (item: ProductsResponse) => {
                this._router.navigate(['information', 'product', 'edit', item.id])
                return of(true);
            }
        }],
        headActions: [{
            name: "Add",
            icon: "mat_solid:add",
            show: () => this.user.role.includes(Role.Admin),
            on: () => {
                this._router.navigate(['information', 'product', 'add'])
                return of(true)
            }
        }]
    }
    ngOnInit(): void {
        this.loadProducts(1, this._pageChangeEvent.pageSize);
    }

    loadProducts(pageIndex: number, pageSize: number) {
        this._repository.List({ currentPage: pageIndex, pageSize: pageSize })
            .subscribe({
                next: (result: Pager<ProductsResponse>) => {
                    this.products = result.elements;

                    // مقدار کل رکوردها را آپدیت میکنیم تا پجیناتور بداند چند صفحه داریم
                    this._pageChangeEvent.length = result.pagination.totalRecords;

                    // خط بسیار مهم: برای اینکه پجیناتور دکمه‌هایش قفل نشود و وضعیت فعلی را درست نشان دهد
                    // مقدار currentPage بک‌آند (مبنای ۱) را منهای ۱ میکنیم تا با pageIndex متریال (مبنای ۰) همخوانی داشته باشد
                    this._pageChangeEvent.pageIndex = result.pagination.currentPage - 1;
                    this._pageChangeEvent.pageSize = result.pagination.pageSize;
                },
                error: (err) => console.error('خطا در دریافت لیست محصولات:', err)
            });
    }

    onDelete(item: ProductsResponse) {
        this._repository.Delete({ id: item.id }).subscribe(() => {
            this.products = this.products.filter(p => p.id !== item.id);
            // لود مجدد برای تنظیم دقیق پجینیشن بعد از حذف
            this.loadProducts(this._pageChangeEvent.pageIndex + 1, this._pageChangeEvent.pageSize);
        });
    }

    onLoad(event: PageChangeEvent): Observable<Pager<ProductsResponse>> {
        return this._repository.List({ currentPage: event.pageIndex, pageSize: event.pageSize });
    }
}