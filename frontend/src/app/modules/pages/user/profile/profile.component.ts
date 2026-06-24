import { Component } from '@angular/core';
import { DialogConfirmComponent } from 'app/component/dialog/confirm/confirm.component';
import { FormBuilderViewComponent } from 'app/component/form-builder/form-builder-view/form-builder-view.component';
import { FormSchema } from 'app/component/form-builder/form-schema.model';
import { FormControlComponent } from 'app/component/form-control.component';
import { Role } from 'app/core/api/enums/role.enums.type';
import { ProfileResponse } from 'app/core/api/models/user/profile/user.response';
import { UpdateProfileRequest } from 'app/core/api/models/user/update profile/user.request';
import { UserRepository } from 'app/core/api/repositories/user.repository';

@Component({
    selector: 'user-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [FormBuilderViewComponent]
})
export class UserProfileComponent extends FormControlComponent<UserProfileComponent, any> {
    constructor(private readonly _repository: UserRepository) {
        super();
    }

    _formSchema: FormSchema = {
        init: this._repository.Profile({}),
        formStyle: {},
        rows: [
            {
                columns: [
                    // ۱. نام و نام خانوادگی
                    {
                        width: { xs: 12, sm: 12, md: 6, lg: 6 },
                        widgets: [
                            {
                                widgetType: 'input',
                                name: 'name',
                                label: 'نام و نام خانوادگی',
                                placeholder: 'نام و نام خانوادگی خود را وارد کنید...',
                                icon: "heroicons_solid:user",
                                validation: { required: true, maxLength: 255 }
                            }
                        ]
                    },
                    // ۲. نام کاربری (یوزرنیم)
                    {
                        width: { xs: 12, sm: 12, md: 6, lg: 6 },
                        widgets: [
                            {
                                widgetType: 'input',
                                name: 'username',
                                label: 'نام کاربری',
                                placeholder: 'نام کاربری خود را وارد کنید...',
                                icon: "heroicons_solid:identification", // آیکون اختصاصی و متمایز برای نام کاربری
                                validation: { required: true, maxLength: 255 }
                            }
                        ]
                    },
                ]
            },
        ]
    };



    onSubmit(value: UpdateProfileRequest) {
        this._repository.UpdateProfile(value).subscribe(_ => {
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