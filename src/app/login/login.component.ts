import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { passwordStrengthValidator } from '../passwordstrengthvalidator';
import { AuthStoreService } from '../auth-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatCardModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');

  constructor(private formBuilder: FormBuilder, public auth: AuthStoreService, private router: Router) {

  }
  loginForm = this.formBuilder.group({
    email: this.formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]),
  });

  updateEmailErrorMessage() {
    const emailControl = this.loginForm.get('email')!;
    if (emailControl.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (emailControl.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    const passwordControl = this.loginForm.get('password')!;
    if (passwordControl.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a value');
    } else if (passwordControl.hasError('passwordStrength')) {
      this.passwordErrorMessage.set('Not a valid password');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  loginSubmit() {
    const loginDetails = this.loginForm.value;
    this.auth.login(loginDetails.email as string, loginDetails.password as string)
        .subscribe({
            next: () => {
                this.router.navigateByUrl('/products');
            },
            error: err => {
                alert("Login failed!");
            }
    });
  }

  reset() {
    this.loginForm.reset();
    console.log(this.loginForm.value)
  }
}
