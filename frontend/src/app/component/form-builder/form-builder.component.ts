import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { BaseComponent } from "../base-component";
import { InputWidget } from "./widget/input/input.widget";
import { FormComponent } from "./form/form.component";
import { TextareaWidget } from "./widget/textarea/textarea.widget";

@Component({
    selector: 'form-builder',
    templateUrl: './form-builder.component.html',
    styleUrl: './form-builder.component.scss',
    standalone: true,
    imports: [CommonModule, InputWidget, FormComponent, TextareaWidget]
})
export class FormBuilderComponent extends BaseComponent {
}