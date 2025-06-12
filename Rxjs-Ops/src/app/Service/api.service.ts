import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { employees } from "../Models/employees.interface";

@Injectable({
  providedIn:'root'
})
export class ApiService{
  public http : HttpClient = inject(HttpClient);

  public getData () : Observable<employees[]> {
    return this.http.get <employees[]>('https://682cbfb74fae18894753bb36.mockapi.io/demo/employees')
  }
}
