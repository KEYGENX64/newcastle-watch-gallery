import { Component, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BaseComponent } from "../../base-component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { DialogConfirmComponent } from "../../dialog/confirm/confirm.component";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, CommonModule,TranslocoModule]
})
export class FormComponent extends BaseComponent {
    onSubmit = output();
    onCancell = output();

    formGroup = input.required<UntypedFormGroup>();
    get _form(): UntypedFormGroup {
        return this.formGroup();
    }

    constructor() { super() }

    onBack() {
        var confirmRef = this._dialog.open(DialogConfirmComponent, {
            data: { title: 'Dialog.Cancel.Title', message: 'Dialog.Cancel.Message' }
        })
        confirmRef.afterClosed().subscribe((confirm: boolean) => {

            if (confirm == true) {
                this.onCancell.emit();
            }
        });
    }
    submit(value: any) {
        var confirmRef = this._dialog.open(DialogConfirmComponent, {
            data: { title: 'Dialog.Processing.Title', message: 'Dialog.Processing.Message' }
        })
        confirmRef.afterClosed().subscribe((confirm: boolean) => {
            if (confirm == true) {
                if (this.onSubmit)
                    this.onSubmit.emit(value);
            }
        });
    }
}