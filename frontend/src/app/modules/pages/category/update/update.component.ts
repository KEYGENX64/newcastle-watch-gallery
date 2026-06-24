import { Component, input } from '@angular/core';
import { DialogConfirmComponent } from 'app/component/dialog/confirm/confirm.component';
import { FormBuilderViewComponent } from 'app/component/form-builder/form-builder-view/form-builder-view.component';
import { FormSchema } from 'app/component/form-builder/form-schema.model';
import { FormControlComponent } from 'app/component/form-control.component';
import { UpdateCategoryRequest } from 'app/core/api/models/category/update/category.request.type';
import { CategoryRepository } from 'app/core/api/repositories/category.repository';

@Component({
    selector: 'update-category',
    standalone: true,
    templateUrl: './update.component.html',
    styleUrl: './update.component.scss',
    imports: [FormBuilderViewComponent]
})
export class UpdateCategoryComponent extends FormControlComponent<UpdateCategoryComponent, any> {
    id = input<number>(0);
    get _id(): number {
        if (this.isPopup) {
            if (this._dialogData.id)
                return +this._dialogData.id;
        }
        else if (this.isRoute) {
            if (this._route.snapshot.paramMap.get("id"))
                return +this._route.snapshot.paramMap.get("id")!;
        }
        else return this.id();

        return 0;
    }

    constructor(private readonly _repository: CategoryRepository) {
        super();
    }

    _formSchema: FormSchema = {
        invisible: [{ name: 'id', defaultValue: { id: this._id }, validation: { required: true } }],
        init: this._repository.Detail({ id: this._id! }),
        formStyle: {},
        rows: [{
            columns: [
                {
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

        },]
    };

    onSubmit(value: UpdateCategoryRequest) {
        this._repository.Update(value).subscribe(_ => {
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