import { Component } from '@angular/core';
import { DialogConfirmComponent } from 'app/component/dialog/confirm/confirm.component';
import { FormBuilderViewComponent } from 'app/component/form-builder/form-builder-view/form-builder-view.component';
import { FormSchema } from 'app/component/form-builder/form-schema.model';
import { FormControlComponent } from 'app/component/form-control.component';
import { AddProductRequest } from 'app/core/api/models/product/add/product.request.type';
import { CategoryRepository } from 'app/core/api/repositories/category.repository';
import { ProductRepository } from 'app/core/api/repositories/product.repository';
import { map } from 'rxjs';

@Component({
    selector: 'add-product',
    standalone: true,
    templateUrl: './add.component.html',
    styleUrl: './add.component.scss',
    imports: [FormBuilderViewComponent]
})
export class AddProductComponent extends FormControlComponent<AddProductComponent, any> {
    constructor(private readonly _repository: ProductRepository, private readonly _categoryRepository: CategoryRepository) {
        super();
    }

    _formSchema: FormSchema = {
        formStyle: {},
        rows: [

            {
                columns: [

                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'input',
                                name: 'name',
                                label: 'نام محصول',
                                placeholder: 'مثال: ساعت مچی کرونوگراف',
                                icon: "heroicons_solid:shopping-bag",
                                validation: { required: true, maxLength: 255 }
                            }
                        ]
                    },
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'input',
                                name: 'brand',
                                label: 'برند محصول',
                                placeholder: 'مثال: رولکس (Rolex)',
                                icon: "heroicons_solid:bookmark",
                                validation: { required: true, maxLength: 255 }
                            }
                        ]
                    },
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'input',
                                name: 'sku',
                                label: 'کد کالا (SKU)',
                                placeholder: 'مثال: RLX-116610',
                                icon: "heroicons_solid:identification",
                                validation: { maxLength: 100 }
                            }
                        ]
                    },

                ],
            },
            // ردیف دوم: وضعیت مالی، انبار و مشخصات ساختاری ساعت
            {
                columns: [
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'inputNumber',
                                name: 'price',
                                label: 'قیمت اصلی (تومان)',
                                placeholder: 'قیمت را به عدد وارد کنید...',
                                icon: "heroicons_solid:credit-card",
                                negetive: false,

                                validation: { required: true, min: 0 }
                            }
                        ]
                    },
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'inputNumber',
                                name: 'discount_price',
                                label: 'قیمت با تخفیف / نهایی (تومان)',
                                placeholder: 'در صورت عدم وجود تخفیف، خالی بگذارید...',
                                icon: "heroicons_solid:currency-dollar",
                                negetive: false,
                                validation: { min: 0, maxRef: 'price' }
                            }
                        ]
                    },
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'select',
                                name: 'gender',
                                label: 'جنسیت',
                                placeholder: 'انتخاب جنسیت هدف...',
                                icon: "heroicons_solid:user-group",
                                // اصلاح ساختار آپشن‌ها به فرمت استاندارد لِیبل و مقدار
                                options: [
                                    { name: "مردانه", id: "men" },
                                    { name: "زنانه", id: "women" },
                                    { name: "یونیسکس", id: "unisex" }
                                ]
                            }
                        ]
                    },

                ],
            },
            {
                columns: [
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'select',
                                name: 'movement_type',
                                label: 'نوع موتور ساعت',
                                placeholder: 'انتخاب نوع مکانیزم موتور...',
                                icon: "heroicons_solid:cog",
                                options: [
                                    { name: "کوارتز (باتری)", id: "کوارتز (باتری)" },
                                    { name: "اتوماتیک", id: "اتوماتیک" },
                                    { name: "مکانیکی کوکی", id: "مکانیکی کوکی" }
                                ]
                            }
                        ]
                    },
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'inputNumber',
                                name: 'stock',
                                label: 'موجودی انبار',
                                placeholder: 'تعداد موجود در انبار را وارد کنید...',
                                icon: "heroicons_solid:cube", // آیکون بسته یا کالا برای انبار
                                negetive: false,
                                decimal: false,
                                validation: { min: 0 }
                            }
                        ]
                    },

                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'select',
                                name: 'category_id',
                                label: 'دسته‌بندی ساعت',
                                placeholder: 'انتخاب دسته‌بندی کالا...',
                                icon: "heroicons_solid:folder",
                                update: (currentPage: number, pageSize: number, search?: string) => this._categoryRepository.List({
                                    currentPage: currentPage, pageSize: pageSize
                                }).pipe(
                                    map(x => {
                                        return {
                                            elements: x.elements.map(w => {
                                                return {
                                                    id: w.id,
                                                    name: w.name
                                                }
                                            }),
                                            pagination: x.pagination
                                        }
                                    })
                                )
                            }
                        ]
                    },

                ],
            },
            {
                columns: [
                    {
                        width: { xs: 12, sm: 12 },
                        widgets: [
                            {
                                widgetType: 'file',
                                name: 'image',
                                label: 'تصویر محصول',
                                placeholder: 'تصویر ساعت را انتخاب کنید',
                                icon: "heroicons_solid:photograph",
                                accept: 'image/*',
                                maxFileSizeMb: 4,
                            }
                        ]
                    },

                ],
            },

            {
                columns: [
                    {
                        width: { xs: 12, sm: 12, md: 12, lg: 12 },
                        widgets: [
                            {
                                widgetType: 'textarea',
                                name: 'description',
                                label: 'توضیحات معرفی و مشخصات فنی',
                                placeholder: 'توضیحات کامل در مورد ویژگی‌ها، جنس بدنه، گارانتی و شیشه ساعت بنویسید...',
                            }
                        ]
                    }
                ],
            },
        ]
    };

    onSubmit(value: AddProductRequest) {
        this._repository.Add(value).subscribe(_ => {
            let confirmRef = this._dialog.open(DialogConfirmComponent, {
                data: { title: 'Dialog.Back.Title', message: 'Dialog.Back.Message' }
            });

            confirmRef.afterClosed().subscribe((result: boolean) => {
                if (result == true) {
                    this.onBack()
                }
            });
        })
    }
}