import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class HelperService {
  static toBool(val) {
    if (val === undefined || val === null || val === '' || val === 'false' || val === 'False') {
      return false;
    } else {
      return true;
    }
  }

  static shuffle(array) {
    let currentIndex = array.length, temp, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }
  static extend(out) {
    out = out || {};

    for (let i = 1; i < arguments.length; i++) {
      if (!arguments[i]) {
        continue;
      }

      for (const key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          out[key] = arguments[i][key];
        }
      }
    }
    return out;
  }
  private data = new BehaviorSubject<string | null>(null);

  data$ = this.data.asObservable()

  sendData(value: any) {
    console.log(value);
    
    this.data.next(value);
    console.log(this.data$)
  }

 
  
}
