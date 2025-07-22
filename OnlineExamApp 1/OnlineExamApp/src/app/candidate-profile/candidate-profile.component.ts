import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, PipeTransform } from '@angular/core';
import { FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-candidate-profile',
    templateUrl: './candidate-profile.component.html',
    styleUrls: ['./candidate-profile.component.css'],
    standalone: true,
    imports : [CommonModule,FormsModule,NgbPagination,MatSpinner]
})
export class CandidateProfileComponent implements OnInit, PipeTransform {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  getUserId: any;
  selectedTechnology: any;
  month: any;
  updatedresume: any;
  closeResult = '';
  loading: boolean;
  addUservisible: boolean = false;
  name: any;
  userTableData: any;
  userTableData2: any;
  kamal: any;
  displayTable: boolean = false;
  quiz: any;
  selecteduser: any;
  mode = 'admin';
  searchmode = '';
  page = 1;
  pageSize = 30;
  collectionSize: any;
  userName: any;
  mobileNo: any;
  email: any;
  experience: any;
  createdDate: any;
  userId: any;
  userdata: any[];
  authorized: boolean = false;
  result: any;
  codesa: string;
  fileToUpload: any;
  progress: any;
  message: any;
  onUploadFinished: any;
  fileUpload: boolean = false;
  fileData: any;
  fieldArray: Array<any> = [];
  TotalScore: number = 0;
  getname: any;
  gettechnology: any;
  loadspinner = false;
  public technologyTypes: string[] = [".Net Developer", "Angular Developer"];
  getdefaultdate: any;
  registerForm: UntypedFormGroup;
  submitted = false;
  constructor(private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute, private formBuilder: UntypedFormBuilder, private modalService: NgbModal) {

  }
  transform(value: string): string {
    return value.replace(/\n/g, '<br/>');
  }
  get f() { return this.registerForm.controls; }
  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      // mobile: ['', Validators.required],
      // exp: ['', Validators.required],
      // res: ['', Validators.required]
    },
    );
    this.displayTable = true;
    this.getUserList();
  }

  refreshCountries() {

    this.userTableData2 = this.userTableData
      .map((sai, i) => ({ id: i + 1, ...sai }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  getUserList() {

    this.loadspinner = true;
    // var myDate = new Date().toISOString();
    // var datetimevalue = myDate.substring(0, myDate.length - 1);
    this.http.get<any>('https://ariqtonlineexamapi.azurewebsites.net/api/User/getAllProfile').subscribe(data => {

      this.loadspinner = false;
      console.log(data);
      this.userdata = data;
      this.message = data;
      this.fieldArray = data;
      console.log("@@@@" + this.userdata + "@@@@@@@@");

      this.userTableData2 = data;
      this.userTableData = data;
      this.collectionSize = this.userTableData.length;
      this.refreshCountries();
    });
  }
  Search() {

    if (this.userName != "" || this.createdDate != "" || this.mobileNo != "" || this.email != "" || this.experience != "") {
      this.userTableData2 = this.userTableData.filter(res => {
        return res.userName.toLocaleLowerCase().match(this.userName.toLocaleLowerCase()) || res.createdDate.toLocaleLowerCase().match(this.createdDate.toLocaleLowerCase()) || res.mobileNo.toLocaleLowerCase().match(this.mobileNo.toLocaleLowerCase() || res.email.toLocaleLowerCase().match(this.email.toLocaleLowerCase()) || res.experience.toLocaleLowerCase().match(this.experience.toLocaleLowerCase()));
      });
    }
    else if (this.userName == "" || this.mobileNo == "" || this.email == "" || this.experience == "") {
      this.getUserList();
      //this.refreshCountries();
    }
  }
  ScheduleDeatils(scheduledetails, row) {
    this.modalService.open(scheduledetails, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  addprofile(profile) {
    this.modalService.open(profile, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  addProfileData() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    else {
      this.loading = true;
      var getLoginName = localStorage.getItem('Blog');
      var name = (<any>(document.getElementById('txtname'))).value;
      var mobile = (<any>(document.getElementById('txtmobile'))).value;
      var experiance = (<any>(document.getElementById('txtExperiance'))).value;
      var technology = (<any>(document.getElementById('technology'))).value;
      var response = (<any>(document.getElementById('txtResponse'))).value;
      var myDate = new Date().toISOString();
      var datetimevalue = myDate.substring(0, myDate.length - 1);
      var result = { UserName: name, MobileNo: mobile, Experience: experiance, createdDate: datetimevalue, Technology: technology, Response: response, createdBy: getLoginName };
      this.http.post<any>('https://ariqtonlineexamapi.azurewebsites.net/api/User/addProfile', result).subscribe(data => {
        alert("Added successfully");
        document.getElementById('addclose').click();
        this.loading = false;
        this.getUserList();
      },
      )
    }

  }
  editprofile(editprofile, row) {

    this.modalService.open(editprofile, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.userId = row.userId;
    (<any>(document.getElementById('txtnames'))).value = row.userName;
    (<any>(document.getElementById('txtmobiles'))).value = row.mobileNo;
    (<any>(document.getElementById('txtExperiances'))).value = row.experience;
    (<any>(document.getElementById('txtExperiances'))).value = row.experience;
    if (row.technology == "1") {
      this.selectedTechnology = ".Net Developer";
    }
    else if (row.technology == "2") {
      this.selectedTechnology = "Angular Developer";
    }
    (<any>(document.getElementById('txtResponses'))).value = row.response;
  }
  updateProfileData() {
    var name = (<any>(document.getElementById('txtnames'))).value;
    var mobile = (<any>(document.getElementById('txtmobiles'))).value;
    var experiance = (<any>(document.getElementById('txtExperiances'))).value;
    var technology = (<any>(document.getElementById('technologys'))).value;
    if (technology == ".Net Developer") {
      this.gettechnology = "1";
    }
    else if (technology == "Angular Developer") {
      this.gettechnology = "2";
    }
    var response = (<any>(document.getElementById('txtResponses'))).value;
    var results = { UserId: this.userId, UserName: name, MobileNo: mobile, Experience: experiance, Technology: this.gettechnology, Response: response };
    this.http.put<any>('https://ariqtonlineexamapi.azurewebsites.net/api/User/updateProfile', results).subscribe(data => {
      alert("Update successfully");
      this.loading = false;
      document.getElementById('updateclose').click();
      this.getUserList();
    },
    )
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
  keyPressAlphaWithSpace(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z\s]*$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
