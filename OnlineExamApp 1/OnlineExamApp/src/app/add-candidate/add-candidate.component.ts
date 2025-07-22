import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { strict } from 'assert';
import { HelperService } from '../services/helper.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-candidate',
    templateUrl: './add-candidate.component.html',
    styleUrls: ['./add-candidate.component.css'],
    standalone: true,
    imports : [CommonModule,FormsModule,ReactiveFormsModule]
})
export class AddCandidateComponent implements OnInit {

  registerForm: UntypedFormGroup;
  closeResult = '';
  loading: boolean;
  submitted = false;
  fileToUpload: any;
  fileData: any;
  getcontactedby: any;
  displaysourcename: boolean = false;
  value:any;
  constructor(private formBuilder: UntypedFormBuilder, private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute,  private helpservice:HelperService) {
  }
  get f() { return this.registerForm.controls; }
  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      mob: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      exp: ['', Validators.required],
      organization: ['', Validators.required],
      currentctc: ['', Validators.required],
      expectedctc: ['', Validators.required],
      noticeperiod: ['', Validators.required],
      uploadresume: ['', Validators.required],
    },
    );
  }
  ngAfterViewInit() {

    var getLocalData = localStorage.getItem('Blog');
    (<any>(document.getElementById('contactedby'))).value = getLocalData;
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  keyPressNumbersDecimal(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  keyPressAlpha(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressAlphaWithSpace(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z\s]*$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressAlphaWithSpaceAndNumber(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z\s]*$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  postdata() {

    this.submitted = true;

    if (this.registerForm.invalid) {

      return;
    }
    else {
      this.loading = true;
      var name = (<any>(document.getElementById('txtName'))).value;
      var mobile = (<any>(document.getElementById('txtmob'))).value;
      var email = (<any>(document.getElementById('txtemail'))).value;
      var experiance = (<any>(document.getElementById('txtexperience'))).value;
      var technology = (<any>(document.getElementById('technology'))).value;
      var currentOrg = (<any>(document.getElementById('txtcurrentOrg'))).value;
      var currentCtc = (<any>(document.getElementById('txtcurrentCtc'))).value;
      var expectedCtc = (<any>(document.getElementById('expectedCtc'))).value;
      var noticeperiod = (<any>(document.getElementById('noticeperiod'))).value;
      var contactedby = (<any>(document.getElementById('contactedby'))).value;
      var source = (<any>(document.getElementById('ddlsource'))).value;
      var sourcename="";
      if(source==6)
      {
        sourcename=(<any>(document.getElementById('txtsourcename'))).value;
      }
      var interviewer = (<any>(document.getElementById('txtinterviewermail'))).value;
      var myDate = new Date().toISOString();
      var datetimevalue = myDate.substring(0, myDate.length - 1);
      // this.value = technology


      var result = { UserName: name, MobileNo: mobile, Email: email, Experience: experiance, CreatedDate: datetimevalue, ExamStatus: 1, Technology: technology,Source:source, Contactedby: contactedby, CurrentCTC: currentCtc, CurrentOrgnization: currentOrg, ExpectedSalary: expectedCtc, NoticePeriod: noticeperiod,SourceName:sourcename,Interviewer:interviewer,InterviewDate:datetimevalue };
      this.http.post<any>('https://ariqtonlineexamappapi.azurewebsites.net/api/User', result).subscribe(data => {
        // console.log(data);


        if (data.userId > 0) {

          this.http.post('https://ariqtonlineexamapi.azurewebsites.net/api/User/savefile/' + data.userId, this.fileData)
            .subscribe(event => {


            });
          this.loading = false;
          alert("Added successfully");

        }
        else {
          alert("This candidate is already exists");
        }
        this.router.navigate(['/users']);
      },
      )
    }

  }

  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.helpservice.sendData(selectedValue);
    console.log( this.helpservice.sendData(selectedValue));

  }

  onSelectFile(files: FileList) {


    this.fileToUpload = true;
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.fileData = formData;

  }

  selectSourceType(){
    var sourcetype = (<any>(document.getElementById('ddlsource'))).value;
    if (sourcetype == 6) {
      this.displaysourcename = true;
    }
    else
    {
      this.displaysourcename = false;
    }
  }

}
