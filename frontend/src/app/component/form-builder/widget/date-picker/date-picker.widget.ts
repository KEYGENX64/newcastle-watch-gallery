import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { BaseComponent } from "app/component/base-component";
import { WidgetConfig } from "../../form-schema.model";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslocoModule } from "@ngneat/transloco";

@Component({
    selector: 'widget-date-picker',
    templateUrl: './date-picker.widget.html',
    styleUrl: './date-picker.widget.scss',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatDatepickerModule,TranslocoModule]
})
export class DatePickerWidget extends BaseComponent {


    formControl = input.required<FormControl>();
    widgetConfig = input.required<WidgetConfig>();

    get _formControl(): FormControl {
        return this.formControl();
    }
    get _widgetConfig(): WidgetConfig {
        return this.widgetConfig();
    }

    constructor() {
        super();
    }


}