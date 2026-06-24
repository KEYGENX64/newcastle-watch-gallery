import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { InputWidget } from "../widget/input/input.widget";
import { FormComponent } from "../form/form.component";
import { TextareaWidget } from "../widget/textarea/textarea.widget";
import { BaseComponent } from "app/component/base-component";
import { FormSchema, WidgetConfig, WidgetInvisible, WidthConfig } from "../form-schema.model";
import { InputPasswordWidget } from "../widget/input-password/input-password.widget";
import { passwordsMatchValidator } from "app/core/validators/passwords-match.validator";
import { passwordsMisMatchValidator } from "app/core/validators/passwords-mis-match.validator";
import { InputNumberWidget } from "../widget/input-number/input-number.widget";
import { InputPhoneWidget } from "../widget/input-phone/input-phone.widget";
import { InputSelectWidget } from "../widget/input-select/input-select.widget";
import { DatePickerWidget } from "../widget/date-picker/date-picker.widget";
import { InputEmailWidget } from "../widget/input-email/input-email.widget";
import { InputFileWidget } from "../widget/input-file/input-file.widget";

@Component({
    selector: 'form-builder-view',
    templateUrl: './form-builder-view.component.html',
    styleUrl: './form-builder-view.component.scss',
    standalone: true,
    imports: [CommonModule, InputWidget, FormComponent, TextareaWidget, InputPasswordWidget, InputNumberWidget, InputPhoneWidget,
        InputSelectWidget, DatePickerWidget, InputEmailWidget, InputFileWidget
    ]
})
export class FormBuilderViewComponent extends BaseComponent {
    onSubmit = output();
    onCancell = output();

    formSchema = input.required<FormSchema>();
    get _formSchema(): FormSchema {
        return this.formSchema();
    }

    _form: UntypedFormGroup = null;

    constructor(private readonly _formBuilder: UntypedFormBuilder) {
        super();
    }


    ngOnInit() {
        if (!this.formSchema) {
            console.error('DynamicFormComponent: formSchema is not provided.');
            return;
        }
        this.onCreateFormBuilder();
        if (this._formSchema.init)
            this._formSchema.init.subscribe(item => {
                console.log(item);
                this._form.setValue(item);
            });
    }

    getColumnClasses(widthConfig: WidthConfig) {
        if (!widthConfig) return { 'col-span-12': true };

        const classes: { [key: string]: boolean } = {};

        // به جای داینامیک نوشتن، کلاس‌های استاتیک ایجاد می‌کنیم تا Tailwind آن‌ها را ببیند
        const getXsClass = (val: number) => `col-span-${val}`;
        const getSmClass = (val: number) => `sm:col-span-${val}`;
        const getMdClass = (val: number) => `md:col-span-${val}`;
        const getLgClass = (val: number) => `lg:col-span-${val}`;
        const getXlClass = (val: number) => `xl:col-span-${val}`;

        if (widthConfig.xs !== undefined) {
            classes[getXsClass(widthConfig.xs)] = true;
        } else {
            classes['col-span-12'] = true;
        }

        if (widthConfig.sm !== undefined) classes[getSmClass(widthConfig.sm)] = true;
        if (widthConfig.md !== undefined) classes[getMdClass(widthConfig.md)] = true;
        if (widthConfig.lg !== undefined) classes[getLgClass(widthConfig.lg)] = true;
        if (widthConfig.xl !== undefined) classes[getXlClass(widthConfig.xl)] = true;

        return classes;
    }


    private onCreateFormBuilder() {
        const group: any = {};
        this._formSchema.rows.forEach(row => {
            row.columns.forEach(column => {
                column.widgets.forEach(widget => {
                    const controlName = widget.name;
                    const validators = this.onCreateValidators(widget);
                    group[controlName] = [widget.defaultValue || null, validators];
                });
            });
        });

        if (this._formSchema.invisible)
            this._formSchema.invisible.forEach(widget => {
                const controlName = widget.name;
                const validators = this.onCreateValidators(widget);
                group[controlName] = [widget.defaultValue || null, validators];
            });

        const formValidators = this.onCreateFormValidators(this._formSchema);
        this._form = this._formBuilder.group(group, {
            validators: formValidators
        });
    }

    private onCreateValidators(widget: WidgetConfig | WidgetInvisible): Validators[] {
        const validators: any[] = [];
        if (widget.validation?.required) {
            validators.push(Validators.required);
        }
        if (widget.validation?.minLength) {
            validators.push(Validators.minLength(widget.validation.minLength));
        }
        if (widget.validation?.maxLength) {
            validators.push(Validators.maxLength(widget.validation.maxLength));
        }
        if (widget.validation?.pattern) {
            validators.push(Validators.pattern(widget.validation.pattern));
        }
        if (widget.validation?.min) {
            validators.push(Validators.min(widget.validation.min));
        }
        if (widget.validation?.max) {
            validators.push(Validators.max(widget.validation.max));
        }
        if (widget.validation?.email) {
            validators.push(Validators.email);
        }
        return validators;
    }
    private onCreateFormValidators(form: FormSchema): Validators[] {
        const validators: any[] = [];
        if (form.validation?.passwordsMatch) {
            validators.push(passwordsMatchValidator(form.validation?.passwordsMatch.from, form.validation?.passwordsMatch.to));
        }

        if (form.validation?.passwordsMisMatch) {
            validators.push(passwordsMisMatchValidator(form.validation?.passwordsMisMatch.from, form.validation?.passwordsMisMatch.to));
        }
        form.rows.forEach(row => {
            row.columns.forEach(column => {
                column.widgets.forEach(widget => {
                    if (widget.validation?.maxRef) {
                        validators.push(this.maxRefValidator(widget.name, widget.validation.maxRef));
                    }
                });
            });
        });
        return validators;
    }
    private maxRefValidator(controlName: string, refControlName: string) {
        return (formGroup: any) => {
            const control = formGroup.get(controlName);
            const refControl = formGroup.get(refControlName);

            if (!control || !refControl || !control.value || !refControl.value) {
                return null;
            }

            const value = Number(control.value);
            const refValue = Number(refControl.value);

            // شبیه‌سازی دقیق ولیدیشن lte لاراول
            if (value > refValue) {
                const error = { lte: true };
                control.setErrors({ ...control.errors, ...error });
                return error;
            } else {
                if (control.errors) {
                    const { lte, ...remainingErrors } = control.errors;
                    control.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
                }
            }
            return null;
        };
    }

    onBack() {
        this.onCancell.emit();
    }
    submit(value: any) {
        this.onSubmit.emit(value);
    }


}