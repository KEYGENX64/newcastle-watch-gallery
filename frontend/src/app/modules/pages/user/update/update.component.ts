import { Component, input } from '@angular/core';
import { DialogConfirmComponent } from 'app/component/dialog/confirm/confirm.component';
import { FormBuilderViewComponent } from 'app/component/form-builder/form-builder-view/form-builder-view.component';
import { FormSchema } from 'app/component/form-builder/form-schema.model';
import { FormControlComponent } from 'app/component/form-control.component';
import { Role } from 'app/core/api/enums/role.enums.type';
import { UpdateUserRequest } from 'app/core/api/models/user/update/user.request';
import { UserRepository } from 'app/core/api/repositories/user.repository';

@Component({
    selector: 'update-user',
    standalone: true,
    templateUrl: './update.component.html',
    styleUrl: './update.component.scss',
    imports: [FormBuilderViewComponent]
})
export class UpdateUserComponent extends FormControlComponent<UpdateUserComponent, any> {

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

    constructor(private readonly _repository: UserRepository) {
        super();
    }

    _formSchema: FormSchema = {
        invisible: [{ name: 'id', defaultValue: { id: this._id }, validation: { required: true } }],
        init: this._repository.Detail({ id: this._id! }),
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
                                label: 'نام و نام خانوادگی',
                                placeholder: 'مثال: محمد امینی',
                                icon: "heroicons_solid:user",
                                validation: { required: true, maxLength: 255 }
                            }
                        ]
                    },
                    // ۲. نام کاربری (یوزرنیم دیتابیس)
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'input',
                                name: 'username',
                                label: 'نام کاربری',
                                placeholder: 'مثال: mohammad_admin',
                                icon: "heroicons_solid:identification", // آیکون متمایز برای یوزرنیم
                                validation: { required: true, maxLength: 255 }
                            }
                        ]
                    },
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'select',
                                name: 'role',
                                label: 'نقش کاربری (سطح دسترسی)',
                                placeholder: 'انتخاب کنید...',
                                icon: "heroicons_solid:shield-check", // آیکون سپر برای نقش‌های دسترسی
                                validation: { required: true },
                                // اصلاح ساختار آبجکت برای هماهنگی با کامپوننت فرم داینامیک استاندارد
                                options: [
                                    { name: 'مدیر سیستم (Admin)', id: 'admin' },
                                    { name: 'کاربر عادی (User)', id: 'user' }
                                ]
                            }
                        ]
                    }
                ],

            },
        ]
    };

    onSubmit(value: UpdateUserRequest) {
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