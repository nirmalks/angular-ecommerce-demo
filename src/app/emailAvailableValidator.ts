import { AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import { UserService } from "./user.service";
import { map, Observable } from "rxjs";

export function emailAvailableValidator(usersService : UserService): AsyncValidatorFn {

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return usersService.findAllUsers().pipe(
        map(users => {
          const user = users.find(user => user.email.toLowerCase() == control.value.toLowerCase());
          return user ? { emailPresent: true } : null;
        })
      )
  }
}
