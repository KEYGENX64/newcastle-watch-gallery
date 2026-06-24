import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordsMisMatchValidator(from: string, to: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(from)?.value;
    const confirm = control.get(to);

    if (password && confirm && password === confirm.value) {
      // ست کردن خطا روی کنترل
      confirm.setErrors({ ...confirm.errors, passwordsMatch: true });
      // ست کردن خطا روی فرم
      control.setErrors({ ...control.errors, passwordsMatch: true });
    } else {
      // پاک کردن خطای کنترل
      if (confirm?.hasError('passwordsMatch')) {
        const errors = { ...confirm.errors };
        delete errors['passwordsMatch'];
        confirm.setErrors(Object.keys(errors).length ? errors : null);
      }
      // پاک کردن خطای فرم
      if (control.errors?.['passwordsMatch']) {
        const formErrors = { ...control.errors };
        delete formErrors['passwordsMatch'];
        control.setErrors(Object.keys(formErrors).length ? formErrors : null);
      }
    }

    return null;
  };
}