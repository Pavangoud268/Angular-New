import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-new-candidate',
    templateUrl: './new-candidate.component.html',
    styleUrls: ['./new-candidate.component.css'],
    standalone: true,
    imports : [CommonModule]
})
export class NewCandidateComponent implements OnInit {
  loading: boolean;
  submitted = false;
  fileToUpload: any;
  fileData: any;
  videoToUpload: any;
  videoData:any;
    registerForm: UntypedFormGroup;
  constructor(private http: HttpClient) { }
  get f() { return this.registerForm.controls; }
  ngOnInit(): void {
  }
  postdata() {
    debugger
    var name = (<any>(document.getElementById('txtName'))).value;
    var mobile = (<any>(document.getElementById('txtmob'))).value;
    var email = (<any>(document.getElementById('txtemail'))).value;
    var qualification = (<any>(document.getElementById('ddlsource'))).value;
    var experiance = (<any>(document.getElementById('txtexperience'))).value;
      var technology = (<any>(document.getElementById('technology'))).value;
    //var communication = (<any>(document.getElementById('txtCommunication'))).value;
    //var logical = (<any>(document.getElementById('txtLogical'))).value;
    //var coding = (<any>(document.getElementById('txtCoding'))).value;
    var myDate = new Date().toISOString();
    var datetimevalue = myDate.substring(0, myDate.length - 1);
    var result = { UserName: name, MobileNo: mobile, Email: email, CreatedDate: datetimevalue, ExamStatus: 1,Source:6,SourceName:'Ariqt Drive',Technology:technology,Qualification:qualification,Experience: experiance};
    debugger
    this.http.post<any>('https://ariqtonlineexamappapi.azurewebsites.net/api/User', result).subscribe(data => {
debugger
        if (data.userId > 0) {
          this.http.post('https://ariqtonlineexamapi.azurewebsites.net/api/User/savefile/' + data.userId, this.fileData)
            .subscribe(event => {
            });
            debugger
            this.http.post('https://ariqtexamappapi.azurewebsites.net/api/User/savevideo/' + data.userId, this.videoData)
            .subscribe(event => {
            });
          this.http.post<any>('https://ariqtexamappapi.azurewebsites.net/api/User/sendemail', data).subscribe(data => {
            alert("Successfully Registered, Please check your Email");
            window.self.close();
          },
          )
        }
        else {
          alert("This candidate is already exists");
        }

      },
      )
    }
    onSelect(event: Event) {
      const target = event.target as HTMLSelectElement;
      const selectedValue = target.value;
      //this.helpservice.sendData(selectedValue);


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

    onSelectVideo(files: FileList) {

debugger
      this.videoToUpload = true;
      if (files.length === 0) {
        return;
      }
      let videoToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', videoToUpload, videoToUpload.name);
      this.videoData = formData;

    }

  }
