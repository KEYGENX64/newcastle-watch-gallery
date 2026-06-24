import { Directive, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[appOnlyNumber]',
    standalone: true
})
export class OnlyNumberDirective {

    @Input() allowDot = false;
    @Input() allowMinus = false;

    private _maxIntegerDigits?: number;
    private _maxDecimalDigits?: number;

    @Input() set maxIntegerDigits(value: number | null | undefined) {
        // null یا undefined را به undefined تبدیل کن (بدون محدودیت)
        this._maxIntegerDigits = (value === null || value === undefined) ? undefined : value;
    }
    get maxIntegerDigits(): number | undefined {
        return this._maxIntegerDigits;
    }

    @Input() set maxDecimalDigits(value: number | null | undefined) {
        this._maxDecimalDigits = (value === null || value === undefined) ? undefined : value;
    }
    get maxDecimalDigits(): number | undefined {
        return this._maxDecimalDigits;
    }

    @HostListener('input', ['$event'])
    onInputChange(event: Event) {
        const input = event.target as HTMLInputElement;
        let value = input.value;
        value = this.convertPersianDigitsToEnglish(value);

        // 1️⃣ حذف کاراکترهای غیرمجاز
        let regex = '0-9';
        if (this.allowDot) regex += '\\.';
        if (this.allowMinus) regex += '-';

        value = value.replace(new RegExp(`[^${regex}]`, 'g'), '');

        // 2️⃣ مدیریت منفی
        if (this.allowMinus) {
            value = value.replace(/-/g, '');
            if (input.value.startsWith('-')) {
                value = '-' + value;
            }
        }

        // 3️⃣ مدیریت اعشار
        if (this.allowDot) {
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
        }

        // 4️⃣ اعمال محدودیت طول عدد
        let isNegative = value.startsWith('-');
        if (isNegative) value = value.substring(1);

        let [integerPart, decimalPart] = value.split('.');

        // حالا از _maxIntegerDigits استفاده می‌کنیم (که null را به undefined تبدیل کرده)
        if (this._maxIntegerDigits !== undefined) {
            integerPart = integerPart?.slice(0, this._maxIntegerDigits);
        }

        if (this.allowDot && this._maxDecimalDigits !== undefined && decimalPart !== undefined) {
            decimalPart = decimalPart.slice(0, this._maxDecimalDigits);
        }

        value = integerPart ?? '';

        if (this.allowDot && decimalPart !== undefined) {
            value += '.' + decimalPart;
        }

        if (isNegative) {
            value = '-' + value;
        }

        input.value = value;
    }

    private convertPersianDigitsToEnglish(value: string): string {
        // تبدیل ارقام عربی (٠-٩) به انگلیسی
        value = value.replace(/[٠-٩]/g, (d) => {
            return String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48);
        });
        // تبدیل ارقام فارسی (۰-۹) به انگلیسی
        value = value.replace(/[۰-۹]/g, (d) => {
            return String.fromCharCode(d.charCodeAt(0) - 0x06F0 + 48);
        });
        return value;
    }
}