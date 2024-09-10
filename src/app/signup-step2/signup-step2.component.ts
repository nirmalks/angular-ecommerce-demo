import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { filter } from 'rxjs';
import { DOCUMENT, JsonPipe } from '@angular/common';
import { FileUploadComponent } from "../file-upload/file-upload.component";
@Component({
  selector: 'app-signup-step2',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatRadioModule, MatDatepickerModule, MatCheckboxModule, MatSelectModule, FileUploadComponent, JsonPipe ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './signup-step2.component.html',
  styleUrl: './signup-step2.component.scss'
})
export class SignupStep2Component implements OnInit {
  constructor(private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) {
  }
  public form = this.formBuilder.group({
    gender: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    isReferred:[''],
    refSource: [''],
    dpFile: [null]
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
    });

    const savedForm = this.document.defaultView?.localStorage?.getItem('step2');
    if(savedForm) {
      this.form.setValue(JSON.parse(savedForm));
    }
    this.form.valueChanges.pipe(filter(() => this.form.valid)).subscribe(
      val => this.document.defaultView?.localStorage.setItem('step2', JSON.stringify(val))
    );
  }
}
