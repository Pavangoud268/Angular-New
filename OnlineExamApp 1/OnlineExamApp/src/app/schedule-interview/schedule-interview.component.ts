import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Quiz } from '../models';
// import { examQuestion } from '../models/examQuestion';
// import { stringify } from '@angular/compiler/src/util';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-schedule-interview',
    templateUrl: './schedule-interview.component.html',
    styleUrls: ['./schedule-interview.component.css'],
    standalone: true,
    imports : [CommonModule,FormsModule,ReactiveFormsModule]
})
export class ScheduleInterviewComponent implements OnInit {
  registerForm: UntypedFormGroup;
  closeResult = '';
  loading: boolean;
  submitted = false;
  displayZoomTextbox: boolean;
  displayF2fTextbox: boolean;
  getUserId: any;
  rowdata: any;
  constructor(private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute, private formBuilder: UntypedFormBuilder, private modalService: NgbModal) {
    this.activatedroute.queryParams.subscribe(data => {

      this.rowdata = JSON.parse(data.rowdata);
      console.log("@@@" + JSON.parse(data.rowdata).question + "@@");
    })
  }
  get f() { return this.registerForm.controls; }
  ngOnInit(): void {

      this.registerForm = this.formBuilder.group({
        intrviewtype: ['', Validators.required],
        date: ['', Validators.required],
        time: ['', Validators.required],
        // interviewername: ['', Validators.required],
        // zoomlink: ['', Validators.required],
        // meetingid: ['', Validators.required],
        // passcode: ['', Validators.required]
      },
      );
  }
  ngAfterViewInit() {

    (<any>(document.getElementById('txtName'))).value = this.rowdata.userName;
    (<any>(document.getElementById('txtmob'))).value = this.rowdata.mobileNo;
    (<any>(document.getElementById('txtemail'))).value = this.rowdata.email;
    this.getUserId = this.rowdata.userId;
  }
  postdata() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    else {
      this.loading = true;
      var zoomLink;
      var interviewerName;
      var interviewType = (<any>(document.getElementById('ddlinterviewtype'))).value;
      if (interviewType == "1") {
        interviewerName = (<any>(document.getElementById('txtinterviwerName'))).value;
        zoomLink = "";
      }
      else if (interviewType == "2") {
        var MeetingId = (<any>(document.getElementById('txtmeetingId'))).value;
        var PassCode = (<any>(document.getElementById('txtpasscode'))).value;
        zoomLink = (<any>(document.getElementById('txtzoomLink'))).value+"@@"+MeetingId+"$$"+PassCode;
        interviewerName = "";
      }
      var interviewDate = (<any>(document.getElementById('txtdate'))).value;
      var interviewTime = (<any>(document.getElementById('txttime'))).value;
      var myDate = new Date().toISOString();
      var datetimevalue = myDate.substring(0, myDate.length - 1);
      var getloginname = localStorage.getItem('Blog');

      var result = { UserId: this.getUserId, InterviewType: interviewType, InterviewDate: interviewDate, InterviewTime: interviewTime, ZoomLink: zoomLink, InterviewerName: interviewerName, CreatedDate: datetimevalue, CreatedBy: getloginname, interviewStatus: "Pending" };
      this.http.post<any>('https://ariqtonlineexamapi.azurewebsites.net/api/ScheduleInterview', result).subscribe(data => {

        this.http.post<any>('https://ariqtonlineexamapi.azurewebsites.net/api/ScheduleInterview/sendemail', result).subscribe(data => {

        },
        )
        this.loading = false;
        alert("Interview is Scheduled");
      });
    }
  }
  selectInterviewType() {
    var interviewType = (<any>(document.getElementById('ddlinterviewtype'))).value;
    if (interviewType == "1") {
      this.displayF2fTextbox = true;
      this.displayZoomTextbox = false;
    }
    else if (interviewType == "2") {
      this.displayF2fTextbox = false;
      this.displayZoomTextbox = true;
    }
  }
}

