import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup , Validators, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatCardModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  errorMessage = signal('');

  constructor(private formBuilder: FormBuilder) {

  }
  loginForm = this.formBuilder.group({
    email: this.formBuilder.nonNullable.control('',[Validators.required, Validators.email]),
    password: this.formBuilder.nonNullable.control('',[Validators.required]),
  });

  updateErrorMessage() {
    const emailControl = this.loginForm.get('email')!;
    if (emailControl.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (emailControl.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  loginSubmit() {
    console.log(this.loginForm.value)
    localStorage.setItem('user', JSON.stringify(this.loginForm.value));
  }

  reset() {
    this.loginForm.reset();
    console.log(this.loginForm.value)
  }
}
