import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nationalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      // پاک کردن خطای فرم والد اگر قبلاً ست شده بود
      if (control.parent?.errors?.['invalidNationalCode']) {
        const formErrors = { ...control.parent.errors };
        delete formErrors['invalidNationalCode'];
        control.parent.setErrors(Object.keys(formErrors).length ? formErrors : null);
      }
      return null;
    }

    if (!/^\d{10}$/.test(value)) {
      control.parent?.setErrors({ ...control.parent?.errors, invalidNationalCode: 'کد ملی باید دقیقا 10 رقم باشد.' });
      return { invalidNationalCode: 'کد ملی باید دقیقا 10 رقم باشد.' };
    }

    const digits = value.split('').map(Number);
    if (digits.every((d: any) => d === digits[0])) {
      control.parent?.setErrors({ ...control.parent?.errors, invalidNationalCode: 'کد ملی معتبر نیست.' });
      return { invalidNationalCode: 'کد ملی معتبر نیست.' };
    }

    const check = digits.pop()!;
    const sum = digits.reduce((acc: any, d: any, i: any) => acc + d * (10 - i), 0);
    const remainder = sum % 11;
    const valid = (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);

    if (!valid) {
      control.parent?.setErrors({ ...control.parent?.errors, invalidNationalCode: 'کد ملی معتبر نیست.' });
      return { invalidNationalCode: 'کد ملی معتبر نیست.' };
    }

    // اگر معتبر بود، خطای فرم والد را پاک کن
    if (control.parent?.errors?.['invalidNationalCode']) {
      const formErrors = { ...control.parent.errors };
      delete formErrors['invalidNationalCode'];
      control.parent.setErrors(Object.keys(formErrors).length ? formErrors : null);
    }

    return null;
  };
}