import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsComponent } from '../questions/questions.component';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: true,
    imports : [CommonModule,QuestionsComponent]
})
export class AdminComponent implements OnInit {

  addUservisible:boolean=false;
  userTableData:any;
  displayAddPage:boolean=false;
  displayTable:boolean=false;
  displayQuestion:boolean=false;
  constructor(private http: HttpClient,private router:Router ) { }

  ngOnInit() {

    this.displayTable=true;
    this.getUserList();
  }
  postdata()
  {

    var name=(<any>(document.getElementById('txtName'))).value;
    var mobile=(<any>(document.getElementById('txtmob'))).value;
    var email=(<any>(document.getElementById('txtemail'))).value;
    var experiance=(<any>(document.getElementById('txtexperience'))).value;
    var myDate = new Date().toISOString();
    var datetimevalue = myDate.substring(0,myDate.length-1);

    var result={ UserName:name,MobileNo:mobile,Email : email,Experience:experiance,CreatedDate:datetimevalue,ExamStatus:1};
    this.http.post<any>('https://ariqtonlineexam.azurewebsites.net/api/User',result).subscribe(data => {
        alert("Added successfully");
    },
    )
  }
  getUserList()
  {
    this.http.get<any>('https://ariqtonlineexam.azurewebsites.net/api/User').subscribe(data => {

      console.log(data);
      this.userTableData=data;
  });
  }
  openAddUserPage()
  {
    this.displayTable=false;
    this.displayAddPage=true;
    this.displayQuestion=false;
  }
  backPage()
  {
    this.displayTable=true;
    this.displayAddPage=false;
    this.displayQuestion=false;
    this.ngOnInit();
  }
  sendMail(event)
  {

    var userId=event.target.id;
    for(var i=0;i<this.userTableData.length;i++)
    {
        if(this.userTableData[i].userId==userId)
        {
          var result={ userId:this.userTableData[i].userId,email:this.userTableData[i].email,userReferenceId : this.userTableData[i].userReferenceId,userName:this.userTableData[i].userName};
          this.http.post<any>('https://ariqtonlineexam.azurewebsites.net/api/User/sendemail',result).subscribe(data => {
              alert("msg sent success");
          },
          )
        }
    }
  }
  showQuations()
  {
    this.displayQuestion=true;
    this.displayTable=false;
    this.displayAddPage=false;
  }

}
