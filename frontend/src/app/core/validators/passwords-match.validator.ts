import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordsMatchValidator(from: string, to: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(from)?.value;
    const confirm = control.get(to);

    if (password && confirm && password !== confirm.value) {
      // ست کردن خطا روی کنترل
      confirm.setErrors({ ...confirm.errors, passwordsMismatch: true });
      // ست کردن خطا روی فرم
      control.setErrors({ ...control.errors, passwordsMismatch: true });
    } else {
      // پاک کردن خطای کنترل
      if (confirm?.hasError('passwordsMismatch')) {
        const errors = { ...confirm.errors };
        delete errors['passwordsMismatch'];
        confirm.setErrors(Object.keys(errors).length ? errors : null);
      }
      // پاک کردن خطای فرم
      if (control.errors?.['passwordsMismatch']) {
        const formErrors = { ...control.errors };
        delete formErrors['passwordsMismatch'];
        control.setErrors(Object.keys(formErrors).length ? formErrors : null);
      }
    }

    return null;
  };
}