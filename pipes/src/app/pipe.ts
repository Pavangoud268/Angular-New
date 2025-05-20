import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'custom',
  pure: false
})

export class CustomPipe implements PipeTransform{
  transform(value: any) {
    return value.toLowerCase()
  }
}
