import { AbstractControl, FormControl } from "@angular/forms";

export class CustomValidators{
  static videoFormat(control : AbstractControl){
    if(!(control.value.includes('.mp4'))){
      return {noSpaceAllowed : true}
    }
    return null
  }
}
