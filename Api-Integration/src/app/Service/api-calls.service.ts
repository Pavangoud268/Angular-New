import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiData } from '../Model/apiData';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor() { }
  http : HttpClient = inject(HttpClient)

  formData = new Observable()

   Getdata() :Observable <apiData>{
    return this.http.get<apiData>('https://682cbfb74fae18894753bb36.mockapi.io/demo/details')
  }

  postData(data : any){
    return this.http.post('https://682cbfb74fae18894753bb36.mockapi.io/demo/details',data)
  }

  deleteData(id : number){
    return this.http.delete('https://682cbfb74fae18894753bb36.mockapi.io/demo/details/'+id)
  }

  putData(id : number,data : apiData){
    return this.http.put('https://682cbfb74fae18894753bb36.mockapi.io/demo/details/'+id,data)
  }

  getSingleData(id : number){
    return this.http.get('https://682cbfb74fae18894753bb36.mockapi.io/demo/details/'+id)
  }

}

export const data = ()=>{
  const http = inject(HttpClient)
  return http.get('https://682cbfb74fae18894753bb36.mockapi.io/demo/details')
}
