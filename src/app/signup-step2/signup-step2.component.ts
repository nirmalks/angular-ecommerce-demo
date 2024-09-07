import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
@Component({
  selector: 'app-signup-step2',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatRadioModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './signup-step2.component.html',
  styleUrl: './signup-step2.component.scss'
})
export class SignupStep2Component {
  constructor(private formBuilder: FormBuilder) {

  }
  public form = this.formBuilder.group({
    gender: ['', [Validators.required]],
    dob: ['', [Validators.required]]
  });
}
