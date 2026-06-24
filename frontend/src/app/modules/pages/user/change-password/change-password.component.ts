import { Component, input } from '@angular/core';
import { DialogConfirmComponent } from 'app/component/dialog/confirm/confirm.component';
import { FormBuilderViewComponent } from 'app/component/form-builder/form-builder-view/form-builder-view.component';
import { FormSchema } from 'app/component/form-builder/form-schema.model';
import { FormControlComponent } from 'app/component/form-control.component';
import { ChangeUserPasswordRequest } from 'app/core/api/models/user/change/password/user.request';
import { UserResponse } from 'app/core/api/models/user/detail/user.response';
import { UserRepository } from 'app/core/api/repositories/user.repository';
import { map } from 'rxjs';

@Component({
    selector: 'user-change-password',
    standalone: true,
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss',
    imports: [FormBuilderViewComponent]
})
export class UserChangePasswordComponent extends FormControlComponent<UserChangePasswordComponent, any> {

    constructor(private readonly _repository: UserRepository) {
        super();
    }

    _formSchema: FormSchema = {
        formStyle: {},
        invisible: [{ name: "id", defaultValue: this._id, validation: { required: true } }],
        rows: [
            {
                columns: [
                    {
                        // تنظیم عرض متوازن در تبلت و دسکتاپ برای جلوه بهتر فیلد پسورد
                        width: { xs: 12, sm: 12, md: 12, lg: 12 },
                        widgets: [
                            {
                                widgetType: 'inputPassword',
                                name: 'new_password',
                                label: 'رمز عبور جدید',
                                placeholder: 'حداقل ۶ کاراکتر وارد کنید...',
                                icon: "heroicons_solid:lock-closed",
                                validation: { required: true, minLength: 6 }
                            }
                        ]
                    }
                ]
            }
        ]
    };

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


    onSubmit(value: ChangeUserPasswordRequest) {
        this._repository.ChangePassword(value).subscribe(_ => {
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