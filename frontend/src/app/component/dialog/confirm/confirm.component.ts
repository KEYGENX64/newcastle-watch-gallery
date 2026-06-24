import { DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { BaseComponent } from "app/component/base-component";
import { DialogConfirm } from "./confirm.type";
import { BidiModule } from "@angular/cdk/bidi";
import { AppSettingService } from "app/core/app-setting/app-setting.service";
import { TranslocoModule } from "@ngneat/transloco";
import { availableLangs } from "environments/available-langs";
import { takeUntil } from "rxjs";

@Component({
    selector: 'dialog-confirm',
    templateUrl: './confirm.component.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, BidiModule, TranslocoModule]
})
export class DialogConfirmComponent extends BaseComponent {
    currentDirection: 'ltr' | 'rtl' = 'ltr';

    constructor(@Inject(DIALOG_DATA) public data: DialogConfirm, private _appSetting: AppSettingService) {
        super();
    }

    ngOnInit() {
        this._appSetting.appSetting$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(setting => {
                var lang = availableLangs.find(x => x.id == setting.lang);
                this.currentDirection = lang!.dir;
            });
    }
}