import { Component } from '@angular/core';
import { DialogConfirmComponent } from 'app/component/dialog/confirm/confirm.component';
import { FormBuilderViewComponent } from 'app/component/form-builder/form-builder-view/form-builder-view.component';
import { FormSchema } from 'app/component/form-builder/form-schema.model';
import { FormControlComponent } from 'app/component/form-control.component';
import { Role } from 'app/core/api/enums/role.enums.type';
import { AddUserRequest } from 'app/core/api/models/user/add/user.request';
import { UserRepository } from 'app/core/api/repositories/user.repository';

@Component({
    selector: 'add-user',
    standalone: true,
    templateUrl: './add.component.html',
    styleUrl: './add.component.scss',
    imports: [FormBuilderViewComponent]
})
export class AddUserComponent extends FormControlComponent<AddUserComponent, any> {
    constructor(private readonly _repository: UserRepository) {
        super();
    }

    _formSchema: FormSchema = {
        formStyle: {},
        rows: [
            {
                columns: [
                    // ۱. نام و نام خانوادگی
                    {
                        width: { xs: 12, sm: 12, md: 6, lg: 3 },
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
                        width: { xs: 12, sm: 12, md: 6, lg: 3 },
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
                    // ۳. رمز عبور
                    {
                        width: { xs: 12, sm: 12, md: 6, lg: 3 },
                        widgets: [
                            {
                                widgetType: 'inputPassword',
                                name: 'password',
                                label: 'رمز عبور',
                                placeholder: 'حداقل ۶ کاراکتر وارد کنید...',
                                icon: "heroicons_solid:lock-closed", // آیکون قفل برای امنیت پسورد
                                validation: { required: true, minLength: 6 }
                            }
                        ]
                    },
                    // ۴. نقش کاربر (اصلاح شده)
                    {
                        width: { xs: 12, sm: 12, md: 6, lg: 3 },
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
            }
        ]
    };

    onSubmit(value: AddUserRequest) {
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