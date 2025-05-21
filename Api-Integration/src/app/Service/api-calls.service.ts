import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor() { }
  http : HttpClient = inject(HttpClient)

  get Getdata(){
    return this.http.get('https://682cbfb74fae18894753bb36.mockapi.io/demo/details')
  }

  postData(data : any){
    return this.http.post('https://682cbfb74fae18894753bb36.mockapi.io/demo/details',data)
  }

  deleteData(id : number){
    return this.http.delete('https://682cbfb74fae18894753bb36.mockapi.io/demo/details/'+id)
  }

}
