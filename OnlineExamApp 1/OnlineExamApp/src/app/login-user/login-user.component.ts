import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html',
    styleUrls: ['./login-user.component.css'],
    standalone: true,
    imports : []
})

export class LoginUserComponent implements OnInit {
  userId:any;
  userdata:any;
//  @Output() visible = new EventEmitter();
  constructor(private router:Router,private activatedroute: ActivatedRoute,private http: HttpClient) {

    // this.activatedroute.queryParams.subscribe(data => {
    //   this.userId=data.id;
    // })

  }

  ngOnInit() {
    var domain = location.href;
    var domainArray = domain.split('=');
    this.userId = domainArray[1];
    this.getuser();
  }
  getuser(){
    this.http.get<any>('https://ariqtonlineexamapi.azurewebsites.net/api/User/'+this.userId).subscribe(data => {

      this.userdata=data;

    })

  }
  getquiz(){

    var userdata=this.userdata;
    if(userdata.examStatus==1)
    {
    userdata.examStatus=2;
    this.http.put<any>("https://ariqtonlineexamapi.azurewebsites.net/api/User/", userdata).subscribe(data => {

      window.location.href="https://ariqtexamportal.azurewebsites.net/quiz?id="+this.userId;
      //window.location.href="https://localhost:4200/quiz?id="+this.userId;
  },
  )
}
else{
  window.location.href="https://ariqtonlineexamportal.azurewebsites.net/quiz?id="+this.userId;
  //window.location.href="https://localhost:4200/quiz?id="+this.userId;
}
  }
}
