import { Component } from '@angular/core';
import { DialogConfirmComponent } from 'app/component/dialog/confirm/confirm.component';
import { FormBuilderViewComponent } from 'app/component/form-builder/form-builder-view/form-builder-view.component';
import { FormSchema } from 'app/component/form-builder/form-schema.model';
import { FormControlComponent } from 'app/component/form-control.component';
import { AddCategoryRequest } from 'app/core/api/models/category/add/category.request.type';
import { CategoryRepository } from 'app/core/api/repositories/category.repository';

@Component({
    selector: 'add-category',
    standalone: true,
    templateUrl: './add.component.html',
    styleUrl: './add.component.scss',
    imports: [FormBuilderViewComponent]
})
export class AddCategoryComponent extends FormControlComponent<AddCategoryComponent, any> {
    constructor(private readonly _repository: CategoryRepository) {
        super();
    }

    _formSchema: FormSchema = {
        formStyle: {},
        rows: [
            {
                columns: [
                    {
                        // ریسپانسیو بر اساس گرید ۱۲ تایی: 
                        // در موبایل تمام‌عرض (12) و در دسکتاپ‌های مختلف نصف عرض (6) یا یک‌چهارم عرض (3) با نظم کامل
                        width: { xs: 12, sm: 12, md: 12, lg: 12 },
                        widgets: [
                            {
                                widgetType: 'input',
                                name: 'name',
                                label: 'نام دسته بندی',
                                placeholder: 'نام دسته بندی را وارد کنید...',
                                icon: "heroicons_solid:tag",
                                validation: { required: true, maxLength: 255 }
                            }
                        ]
                    }
                ],
            }
        ]
    };

    onSubmit(value: AddCategoryRequest) {
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