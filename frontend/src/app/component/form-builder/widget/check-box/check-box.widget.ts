import { Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BaseComponent } from "app/component/base-component";
import { WidgetConfig } from "../../form-schema.model";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    templateUrl: './check-box.widget.html',
    selector: 'widget-check-box',
    styleUrl: 'check-box.widget.scss',
    imports: [MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule, CommonModule]
})
export class CheckBoxWidget extends BaseComponent {

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