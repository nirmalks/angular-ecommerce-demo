import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function comparePasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(controlName);
    const confirmPasswordControl = formGroup.get(matchingControlName);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const passwordValue = passwordControl.value;
    const confirmPasswordValue = confirmPasswordControl.value;

    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}
