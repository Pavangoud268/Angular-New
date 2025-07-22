import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-interview-evaluation-form',
    templateUrl: './interview-evaluation-form.component.html',
    styleUrls: ['./interview-evaluation-form.component.css'],
    standalone: true,
    imports : [CommonModule]
})
export class InterviewEvaluationFormComponent implements OnInit {
  userId:any;
  userdata:any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var domain = location.href;
    var domainArray = domain.split('=');
    this.userId = domainArray[1];
    this.getuser();
  }
  getuser(){

    this.http.get<any>('https://ariqtonlineexamappapi.azurewebsites.net/api/User/'+this.userId).subscribe(data => {

      this.userdata=data;
    })

  }
  postevaluationform(){

    var evaluationdata=[];
    var revrating=0;
    var revcomments="";
    for(var i=1;i<8;i++){
      revcomments=(<any>(document.getElementById('txtrating'+i))).value;
      var element=(<any>(document.getElementsByName('rating'+i)));
      for(var r = 0; r < element.length; r++) {

        if(element[r].checked)
        revrating=element[r].value;
    }
      var evaldata={UserId:this.userdata.userId,ReviewTypeId:i,Rating:revrating,Comments:revcomments};
      evaluationdata.push(evaldata);
    }

    this.http.post<any>('https://ariqtonlineexamappapi.azurewebsites.net/api/InterviewerReviewForm', evaluationdata).subscribe(data => {

alert("Review Posted Successfully");

          });
  }
}
