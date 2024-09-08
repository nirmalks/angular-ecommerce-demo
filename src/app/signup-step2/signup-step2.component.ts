import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { emit } from 'process';
@Component({
  selector: 'app-signup-step2',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatRadioModule, MatDatepickerModule, MatCheckboxModule, MatSelectModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './signup-step2.component.html',
  styleUrl: './signup-step2.component.scss'
})
export class SignupStep2Component implements OnInit {
  constructor(private formBuilder: FormBuilder) {

  }
  public form = this.formBuilder.group({
    gender: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    isReferred:[''],
    refSource: ['']
  });

  get isReferred() {
    return this.form.get('isReferred')?.value!;
  }

  ngOnInit() {
    this.form.get('isReferred')?.valueChanges.subscribe(val => {
      const isReferredValidValue = this.isReferred;
      const refSourceControl = this.form.get('refSource');
      if(isReferredValidValue) {
        refSourceControl?.setValidators([Validators.required]);
      } else {
        refSourceControl?.clearValidators();
        refSourceControl?.setValue('');
      }

    })
  }
}
