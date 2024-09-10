import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: AddressFormComponent
  }],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {
  @Input()
  legend: string;
  onTouched = () => {};
  onChangeSub: Subscription;
  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {

  }
  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }
  writeValue(obj: any): void {
    if (obj) {
      this.form.setValue(obj, { emitEvent: false });
    }
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChangeSub = this.form.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    }
    else {
      this.form.enable();
    }
    this.cdr.markForCheck();
  }

  form = this.formBuilder.group({
    addressLine1: ['', [Validators.required]],
    city: ['', [Validators.required]],
    pinCode: ['', [Validators.required]]
  });
}
