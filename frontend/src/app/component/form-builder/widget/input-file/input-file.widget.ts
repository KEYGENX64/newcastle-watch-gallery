import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BaseComponent } from "app/component/base-component";
import { WidgetConfig } from "../../form-schema.model";
import { TranslocoModule } from "@ngneat/transloco";

@Component({
    selector: 'widget-input-file',
    templateUrl: './input-file.widget.html',
    styleUrl: './input-file.widget.scss',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, ReactiveFormsModule, TranslocoModule]
})
export class InputFileWidget extends BaseComponent {

    formControl = input.required<FormControl>();
    widgetConfig = input.required<WidgetConfig>();

    get _formControl(): FormControl {
        return this.formControl();
    }
    get _widgetConfig(): WidgetConfig {
        return this.widgetConfig();
    }

    isDragOver = false;

    get previewUrl(): string | null {
        const value = this._formControl?.value;
        if (!value) return null;
        if (value instanceof File) return URL.createObjectURL(value);
        if (typeof value === 'string') return value; // آدرس عکسی که از سرور اومده
        return null;
    }

    get fileName(): string | null {
        const value = this._formControl?.value;
        if (value instanceof File) return value.name;
        if (typeof value === 'string') return value.split('/').pop() ?? null;
        return null;
    }

    get isImage(): boolean {
        const value = this._formControl?.value;
        if (value instanceof File) return value.type.startsWith('image/');
        if (typeof value === 'string') return /\.(png|jpe?g|gif|webp|svg)$/i.test(value);
        return false;
    }

    constructor() {
        super();
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0] ?? null;
        this.setFile(file);
        input.value = '';
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.isDragOver = false;
        const file = event.dataTransfer?.files?.[0] ?? null;
        this.setFile(file);
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.isDragOver = true;
    }

    onDragLeave() {
        this.isDragOver = false;
    }

    removeFile(event: Event) {
        event.stopPropagation();
        this._formControl.setValue(null);
        this._formControl.markAsDirty();
        this._formControl.markAsTouched();
    }

    private setFile(file: File | null) {
        if (!file) return;

        if (this._widgetConfig.accept && !this.isFileAccepted(file, this._widgetConfig.accept)) {
            this._formControl.setErrors({ invalidFileType: true });
            this._formControl.markAsTouched();
            return;
        }

        const maxSizeMb = this._widgetConfig.maxFileSizeMb;
        if (maxSizeMb && file.size > maxSizeMb * 1024 * 1024) {
            this._formControl.setErrors({ fileTooLarge: { maxFileSizeMb: maxSizeMb } });
            this._formControl.markAsTouched();
            return;
        }

        this._formControl.setValue(file);
        this._formControl.markAsDirty();
        this._formControl.markAsTouched();
    }

    private isFileAccepted(file: File, accept: string): boolean {
        const acceptList = accept.split(',').map(a => a.trim().toLowerCase());
        const fileName = file.name.toLowerCase();
        const fileType = file.type.toLowerCase();

        return acceptList.some(rule => {
            if (rule.endsWith('/*')) return fileType.startsWith(rule.split('/')[0] + '/');
            if (rule.startsWith('.')) return fileName.endsWith(rule);
            return fileType === rule;
        });
    }
}