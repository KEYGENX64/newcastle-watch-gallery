import { Component } from '@angular/core';
import { DialogConfirmComponent } from 'app/component/dialog/confirm/confirm.component';
import { FormBuilderViewComponent } from 'app/component/form-builder/form-builder-view/form-builder-view.component';
import { FormSchema } from 'app/component/form-builder/form-schema.model';
import { FormControlComponent } from 'app/component/form-control.component';
import { ChangeMyPasswordRequest } from 'app/core/api/models/user/change/my-password/user.request';
import { UserRepository } from 'app/core/api/repositories/user.repository';

@Component({
    selector: 'user-change-my-password',
    standalone: true,
    templateUrl: './change-my-password.component.html',
    styleUrl: './change-my-password.component.scss',
    imports: [FormBuilderViewComponent]
})
export class UserChangeMyPasswordComponent extends FormControlComponent<UserChangeMyPasswordComponent, any> {

    constructor(private readonly _repository: UserRepository) {
        super();
    }

    _formSchema: FormSchema = {
        formStyle: {},
        // اصلاح نام فیلدها در کلیدهای ولیدیشن برای هماهنگی با نام دقیقِ ویجت‌ها
        validation: {
            passwordsMatch: { from: "new_password", to: "new_password_confirmation" },
            passwordsMisMatch: { to: "new_password", from: "current_password" }
        },
        rows: [
            {
                columns: [
                    // ۱. رمز عبور فعلی (تمام‌عرض برای حفظ حریم و ساختار ردیف اول)
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'inputPassword',
                                name: 'current_password',
                                label: 'رمز عبور فعلی',
                                placeholder: 'رمز عبور کنونی خود را وارد کنید...',
                                icon: "heroicons_solid:key", // آیکون کلید برای پسورد فعلی
                                validation: { required: true, minLength: 6 }
                            }
                        ]
                    },
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'inputPassword',
                                name: 'new_password',
                                label: 'رمز عبور جدید',
                                placeholder: 'حداقل ۶ کاراکتر وارد کنید...',
                                icon: "heroicons_solid:lock-closed", // آیکون قفل برای رمز جدید
                                validation: { required: true, minLength: 6 }
                            }
                        ]
                    },
                    // ۳. تکرار رمز عبور جدید (نصف عرض در دسکتاپ و تبلت)
                    {
                        width: { xs: 12, sm: 12, lg: 4 },
                        widgets: [
                            {
                                widgetType: 'inputPassword',
                                name: 'new_password_confirmation',
                                label: 'تکرار رمز عبور جدید',
                                placeholder: 'رمز عبور جدید را مجدداً وارد کنید...',
                                icon: "heroicons_solid:shield-check", // آیکون تاییدیه امنیتی برای فیلد تکرار
                                validation: { required: true, minLength: 6 }
                            }
                        ]
                    }
                ]
            },

        ]
    };


    onSubmit(value: ChangeMyPasswordRequest) {
        this._repository.ChangeMyPassword(value).subscribe(_ => {
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