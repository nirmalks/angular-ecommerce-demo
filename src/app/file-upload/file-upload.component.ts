import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../user.service';
import { catchError, finalize, of } from 'rxjs';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpEventType } from '@angular/common/http';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatProgressBarModule],
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    }
  ],
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input()
  requiredFileType: string = '';
  fileName: string= '';
  error = false;
  uploadProgress: number = 0;
  onChange = (fileName: string) => { this.fileName = fileName};
  onTouched = () => {};
  onValidatorChange = () => {};
  isDisabled = false;
  fileUploadSuccess = false;
  constructor(private userService: UserService) {

  }
  validate(control: AbstractControl): ValidationErrors | null {
    if(this.fileUploadSuccess) {
      return null;
    }
    let errors: any = {
      requiredFileType: this.requiredFileType
    }
    if(!this.fileUploadSuccess) {
      errors.uploadFailed = true;
    }
    return errors;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
  writeValue(obj: any): void {
    this.fileName = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileName = file.name;
    const formData = new FormData();
    formData.append("dp", file);
    this.onChange(this.fileName); // to circumvent api error as there is no BE
    this.fileUploadSuccess = true;
    this.userService.dpUpload(formData).pipe(
      catchError(error => {
        this.error = true;
        return of(error);
      }),
      finalize(() => {
        this.uploadProgress = 0;
      })
    ).subscribe(event => {
      if(event.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      } else if(event.type == HttpEventType.Response) {
        this.onChange(this.fileName);
        this.fileUploadSuccess = true;
        this.onValidatorChange();
      }
    });
  }

  onClick(fileUpload: any) {
    this.onTouched();
    fileUpload.click();
  }
}
