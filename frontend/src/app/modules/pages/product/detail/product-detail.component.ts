import { CommonModule, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { ProductRepository } from "app/core/api/repositories/product.repository";
import { UserService } from "app/core/user/user.service";
import { Role } from "app/core/api/enums/role.enums.type";
import { DetailProductResponse } from "app/core/api/models/product/detail/product.response.type";
import { PipeLineModule } from "app/core/pipe-line/pipe-line.module";
import { DialogConfirmComponent } from "app/component/dialog/confirm/confirm.component";
import { FormControlComponent } from "app/component/form-control.component";

@Component({
    selector: 'app-product-detail',
    standalone: true,
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss',
    imports: [CommonModule, MatIconModule, PipeLineModule]
})
export class ProductDetailComponent extends FormControlComponent<ProductDetailComponent, any> {
    product: DetailProductResponse; // اضافه کردن فیلد تصویر به مدل به صورت داینامیک
    isAdminUser: boolean = false;

    constructor(
        private readonly _repository: ProductRepository,
        private readonly _userService: UserService,
    ) {
        super();
    }

    ngOnInit(): void {
        // ۱. بررسی ادمین بودن کاربر
        this._userService.user$.subscribe(user => {
            this.isAdminUser = user?.role?.includes(Role.Admin) ?? false;
        });

        // ۲. گرفتن ID از روت و لود اطلاعات محصول
        this._route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.loadProductDetails(id);
            }
        });
    }

    loadProductDetails(id: number) {
        // متد Get یا روندی که در Repository برای گرفتن یک محصول داری را اینجا صدا بزن
        this._repository.Detail({ id }).subscribe(result => {
            this.product = result;
        });
    }

    get isAdmin(): boolean {
        return this.isAdminUser;
    }

    get hasDiscount(): boolean {
        return !!this.product?.discount_price;
    }

    get finalPrice(): number {
        if (!this.product) return 0;
        return this.hasDiscount ? this.product.discount_price : this.product.price;
    }

    get isOutOfStock(): boolean {
        return !this.product?.stock || this.product.stock <= 0;
    }

    get stockLabel(): string {
        return this.isOutOfStock ? 'ناموجود' : `${this.product.stock} عدد موجود در انبار`;
    }

    get genderLabel(): string {
        switch (this.product.gender) {
            case 'men': return 'مردانه';
            case 'women': return 'زنانه';
            case 'unisex': return 'یونیسکس';
            default: return '';
        }
    }

    get movementTypeLabel(): string {
        switch (this.product?.movement_type) {
            case 'quartz': return 'کوارتز';
            case 'automatic': return 'اتوماتیک';
            case 'mechanical': return 'مکانیکی';
            default: return this.product?.movement_type || '';
        }
    }

    formatPrice(value: number): string {
        return new Intl.NumberFormat('fa-IR').format(value) + ' تومان';
    }

    onBack() {
        this._location.back();
    }

    onEdit() {
        this._router.navigate(['information', 'product', 'edit', this.product.id]);
    }

    onRemove() {
        let dialogRef = this._dialog.open(DialogConfirmComponent, {
            data: { title: 'Dialog.Processing.Title', message: 'Dialog.Processing.Message' }
        })
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result == true) {
                // منطق حذف محصول با سابسکشن ریپازیتوری
                this._repository.Delete({ id: this.product.id }).subscribe(() => {


                    this.onBack()
                });
            }
        });
    }
}