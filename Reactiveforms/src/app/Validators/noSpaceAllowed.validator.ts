import { AbstractControl, FormControl } from "@angular/forms";

export class CustomValidators{
  static noSpaceAllowed(control : AbstractControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed : true}
    }
    return null
  }
}
