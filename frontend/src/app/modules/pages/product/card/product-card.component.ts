import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ProductsResponse } from "app/core/api/models/product/list/products.response.type";

@Component({
    selector: 'app-product-card',
    standalone: true,
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss',
    imports: [CommonModule, MatIconModule, MatButtonModule,MatTooltipModule]
})
export class ProductCardComponent {
    product = input.required<ProductsResponse>();
    isAdmin = input<boolean>(false);

    view = output<void>();
    edit = output<void>();
    remove = output<void>();

    get _product(): ProductsResponse {
        return this.product();
    }

    get hasDiscount(): boolean {
        return !!this._product.discount_price;
    }



    get isOutOfStock(): boolean {
        return !this._product.stock || this._product.stock <= 0;
    }

    get stockLabel(): string {
        return this.isOutOfStock ? 'ناموجود' : `${this._product.stock} عدد موجود`;
    }

    get genderLabel(): string {
        switch (this._product.gender) {
            case 'men': return 'مردانه';
            case 'women': return 'زنانه';
            case 'unisex': return 'یونیسکس';
            default: return '';
        }
    }

    get movementTypeLabel(): string {
        switch (this._product.movement_type) {
            case 'quartz': return 'کوارتز';
            case 'automatic': return 'اتوماتیک';
            case 'mechanical': return 'مکانیکی';
            default: return this._product.movement_type || '';
        }
    }


    onView() {
        this.view.emit();
    }

    onEdit(event: Event) {
        event.stopPropagation();
        this.edit.emit();
    }

    onRemove(event: Event) {
        event.stopPropagation();
        this.remove.emit();
    }
}