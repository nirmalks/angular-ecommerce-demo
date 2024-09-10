import { AfterViewInit, Component, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { comparePasswordValidator } from '../comparepasswordvalidator';
import { emailAvailableValidator } from '../emailAvailableValidator';
import { UserService } from '../user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-signup-step1',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatCardModule, AddressFormComponent],
  templateUrl: './signup-step1.component.html',
  styleUrl: './signup-step1.component.scss'
})
export class SignupStep1Component {
  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  confirmPasswordErrorMessage = signal('');

  constructor(private formBuilder: FormBuilder, private usersService: UserService) {

  }

  signupForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email], [ emailAvailableValidator( this.usersService)]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    address: ['',[Validators.required]]
  },
  {
    validators: comparePasswordValidator('password', 'confirmPassword'),
  },
  );
  signupSubmit() {

  }

  updateEmailErrorMessage() {
    const emailControl = this.signupForm.get('email')!;
    if (emailControl.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (emailControl.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else if (emailControl.hasError('emailPresent')) {
      this.emailErrorMessage.set('Email is already registered with an account');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    const passwordControl = this.signupForm.get('password')!;
    if (passwordControl.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a value');
    } else if (passwordControl.hasError('passwordStrength')) {
      this.passwordErrorMessage.set('Not a valid password');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  updateConfirmPasswordErrorMessage() {
    const passwordControl = this.signupForm.get('confirmPassword')!;
    if (passwordControl.hasError('required')) {
      this.confirmPasswordErrorMessage.set('You must enter a value');
    } else if (passwordControl.hasError('passwordStrength')) {
      this.confirmPasswordErrorMessage.set('Password not strong enough');
    } else if (passwordControl.hasError('passwordMismatch')) {
      this.confirmPasswordErrorMessage.set('Passwords do not match');
    } else {
      this.confirmPasswordErrorMessage.set('');
    }
  }

  reset() {
    this.signupForm.reset();
  }
}
