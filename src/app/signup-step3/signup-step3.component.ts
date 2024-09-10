import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-signup-step3',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, FormsModule],
  templateUrl: './signup-step3.component.html',
  styleUrl: './signup-step3.component.scss'
})
export class SignupStep3Component {
  constructor(private formBuilder: FormBuilder) {}
  form = this.formBuilder.group({
    family: this.formBuilder.array([

    ])
  });

  get family() {
    return this.form.controls["family"] as FormArray;
  }

  get familyArrayControls() {
    return (this.form.controls["family"] as FormArray).controls as FormGroup[];
  }

  addFamilyMember() {
    const member = this.formBuilder.group({
      name: ['', Validators.required],
      relationship: ['', Validators.required]
    })
    this.family.push(member);
  }

  deleteFamilyMember(index: number) {
    this.family.removeAt(index);
  }
}
