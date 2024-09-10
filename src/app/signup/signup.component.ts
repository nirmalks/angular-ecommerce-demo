import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../user.service';
import { SignupStep1Component } from "../signup-step1/signup-step1.component";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { SignupStep2Component } from '../signup-step2/signup-step2.component';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatCardModule, SignupStep1Component,
    MatStepperModule, SignupStep2Component],
  providers: [UserService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  submit(step1: any, step2: any) {
    console.log(step1, step2)
  }

}
