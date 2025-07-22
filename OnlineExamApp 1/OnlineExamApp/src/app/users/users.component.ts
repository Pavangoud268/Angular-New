import { HttpClient, HttpEventType } from "@angular/common/http";
import {
  Component,
  inject,
  OnInit,
  Pipe,
  PipeTransform,
  signal,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Quiz } from "../models";
import { examQuestion } from "../models/examQuestion";
//import { stringify } from "@angular/compiler/src/util";
import {
  FormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  ModalDismissReasons,
  NgbModal,
  NgbPagination,
} from "@ng-bootstrap/ng-bootstrap";
import { HelperService } from "../services/helper.service";
import { CommonModule } from "@angular/common";
import { nl2brPipe } from "../nl2br.pipe";
import { MatSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPagination, nl2brPipe, MatSpinner],
})
export class UsersComponent implements OnInit, PipeTransform {
  registerForm: UntypedFormGroup;
  getUserId: any;
  month: any;
  updatedresume: any;
  selectedTechnology: any;
  selectedUserStatus: any;
  public technologyTypes: string[] = [
    ".Net Developer",
    "Angular Developer",
    "Fullstack Developer",
    "Rust Developer",
    "PHP Developer",
    "Python Developer",
    "VueJs",
    "Tester",
    "Scrum Master",
    "Devops Engineer",
    "Agu",
  ];
  public userStatuses: string[] = [
    "Interview Scheduled",
    "Interview Done",
    "Evaluation Submitted",
    "Passed Tech Round",
    "Failed Tech Round",
    "Offer Accepted",
    "Offer Rejected",
  ];
  closeResult = "";
  loading: boolean;
  submitted = false;
  addUservisible: boolean = false;
  name: any;
  userTableData: any;
  userTableData2: any;
  kamal: any;
  displayTable: boolean = false;
  quiz: any;
  selecteduser: any;
  mode = "admin";
  // page = signal(1);
  // pageSize = signal(30);
  collectionSize: any;
  userName: any;
  mobileNo: any;
  email: any;
  emailaddr: any;
  experience: any;
  userId: any;
  userdata: any[];
  authorized: boolean = false;
  result: any;
  codesa: string;
  fileToUpload: any;
  loadspinner = false;
  progress: any;
  message: any;
  onUploadFinished: any;
  fileUpload: boolean = false;
  fileData: any;
  fieldArray: Array<any> = [];
  TotalScore: number = 0;
  rating1: number = 0;
  rating2: number = 0;
  rating3: number = 0;
  rating4: number = 0;
  rating5: number = 0;
  rating6: number = 0;
  rating7: number = 0;
  interviewuser: any;
  ExamPercentage: number = 0;
  getname: any;
  filename: any;
  getNumberOfQuestions: number = 0;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private helpservice: HelperService
  ) {}
  protected modalService = inject(NgbModal);
  transform(value: string): string {
    return value.replace(/\n/g, "<br/>");
  }
  ngOnInit() {
    this.displayTable = true;
    this.getUserList();
  }
  getQuestions() {
    var technologyid = this.selecteduser.technology;
    this.http
      .get<any>(
        "https://ariqtonlineexamapi.azurewebsites.net/api/Question/technology/" +
          technologyid
      )
      .subscribe((res) => {
        var qstns = [];
        if (this.selecteduser.experience <= 2) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].complexity == "low") {
              qstns.push(res[i]);
            }
          }
        } else if (
          this.selecteduser.experience > 2 &&
          this.selecteduser.experience <= 5
        ) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].complexity == "medium") {
              qstns.push(res[i]);
            }
          }
        } else if (this.selecteduser.experience > 5) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].complexity == "high") {
              qstns.push(res[i]);
            }
          }
        }
        var resdata = {
          id: 1,
          name: "Online test",
          description:
            ".Net Quiz (Basic Multiple Choice Questions for .Net Developers)",
          questions: qstns,
        };

        this.quiz = new Quiz(resdata);
        this.http
          .get<any>(
            "https://ariqtonlineexamapi.azurewebsites.net/api/Answer/" +
              this.selecteduser.userId
          )
          .subscribe((data) => {
            var answers = data;
            this.TotalScore = 0;
            for (var i = 0; i < this.quiz.questions.length; i++) {
              for (var k = 0; k < answers.length; k++) {
                if (
                  answers[k].questionId == this.quiz.questions[i].questionId
                ) {
                  if (this.quiz.questions[i].questionType == 1) {
                    for (
                      var j = 0;
                      j < this.quiz.questions[i].choices.length;
                      j++
                    ) {
                      if (
                        this.quiz.questions[i].choices[j].choiceId ==
                        answers[k].choiceId
                      ) {
                        this.quiz.questions[i].choices[j].selected = true;
                        if (this.quiz.questions[i].choices[j].isCorrect) {
                          this.TotalScore = this.TotalScore + 1;
                        }
                      } else {
                        this.quiz.questions[i].choices[j].selected = false;
                      }
                    }
                  } else {
                    this.quiz.questions[i].code = answers[k].code;
                  }
                }
              }
            }

            this.getNumberOfQuestions = this.quiz.questions.length;
            var percentage =
              (this.TotalScore / this.getNumberOfQuestions) * 100;
            this.ExamPercentage = Math.round(percentage);
          });
      });
  }

  onEmailFilterClick() {}
  // refreshCountries() {
  //   this.userTableData2 = this.userTableData
  //     .map((sai, i) => ({ id: i + 1, ...sai }))
  //     .slice(
  //       (this.page() - 1) * this.pageSize(),
  //       (this.page() - 1) * this.pageSize() + this.pageSize()
  //     );
  // }
  // In your component class
  private _page = signal(1);
  get page(): number {
    return this._page();
  }
  set page(value: number) {
    this._page.set(value);
    this.refreshCountries();
  }

  private _pageSize = signal(30);
  get pageSize(): number {
    return this._pageSize();
  }
  set pageSize(value: number) {
    this._pageSize.set(value);
    this.refreshCountries();
  }

  // Update any references in your methods from page() to just page
  refreshCountries() {
    this.userTableData2 = this.userTableData
      .map((sai, i) => ({ id: i + 1, ...sai }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  async getUserList() {
    try {
      this.loadspinner = true;
      const data = await this.http
        .get<any>("https://ariqtonlineexamappapi.azurewebsites.net/api/User")
        .toPromise();
      this.loadspinner = false;
      this.userdata = data;
      this.message = data;
      this.fieldArray = data;
      this.userTableData2 = data;
      this.userTableData = data;

      this.collectionSize = this.userTableData.length;
      this.refreshCountries();
    } catch (error) {
      this.loadspinner = false;
      console.error("Error fetching user list:", error);
    }
  }

  getResult(candidate) {
    this.selecteduser = candidate;
    this.mode = "result";
    this.displayTable = false;
    this.getQuestions();
  }
  getevaluationForm(candidate, row) {
    if (row.isReviewGiven) {
      this.interviewuser = row;
      this.selecteduser = candidate;
      this.mode = "interview";
      this.displayTable = false;
      this.getEvaluationFormDetails(row);
    } else {
      alert("Review not given");
    }
  }
  getEvaluationFormDetails(candidatedata) {
    this.http
      .get<any>(
        "https://ariqtonlineexamappapi.azurewebsites.net/api/InterviewerReviewForm/" +
          candidatedata.userId
      )
      .subscribe((res) => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].reviewTypeId == 1) {
            this.rating1 = res[i].rating;
            (<any>document.getElementById("txtrating1")).value =
              res[i].comments;
          }
          if (res[i].reviewTypeId == 2) {
            this.rating2 = res[i].rating;
            (<any>document.getElementById("txtrating2")).value =
              res[i].comments;
          }
          if (res[i].reviewTypeId == 3) {
            this.rating3 = res[i].rating;
            (<any>document.getElementById("txtrating3")).value =
              res[i].comments;
          }
          if (res[i].reviewTypeId == 4) {
            this.rating4 = res[i].rating;
            (<any>document.getElementById("txtrating4")).value =
              res[i].comments;
          }
          if (res[i].reviewTypeId == 5) {
            this.rating5 = res[i].rating;
            (<any>document.getElementById("txtrating5")).value =
              res[i].comments;
          }
          if (res[i].reviewTypeId == 6) {
            this.rating6 = res[i].rating;
            (<any>document.getElementById("txtrating6")).value =
              res[i].comments;
          }
          if (res[i].reviewTypeId == 7) {
            this.rating7 = res[i].rating;
            (<any>document.getElementById("txtrating7")).value =
              res[i].comments;
          }
        }
      });
  }
  download(candidate) {
    var result = candidate;
    window.location.href =
      "https://onlineexamresumes.blob.core.windows.net/interviewcandidates/" +
      candidate.uploadResume;
  }
  get f() {
    return this.registerForm.controls;
  }
  Returnpage() {
    this.mode = "tableResult";
    this.displayTable = true;
  }

  isCorrect(question: examQuestion) {
    var result = question.choices.every((x) => x.selected === x.isCorrect)
      ? "Correct"
      : "Wrong";

    return result;
  }
  backPage() {
    this.displayTable = true;
  }
  sendMail(result) {
    this.http
      .post<any>(
        "https://ariqtexamappapi.azurewebsites.net/api/User/sendemail",
        result
      )
      .subscribe((data) => {
        alert("Mail sent successfully");
        this.getUserList();
      });
  }
  sendEvaluation(result) {
    this.http
      .post<any>(
        "https://ariqtexamappapi.azurewebsites.net/api/User/sendevaluation",
        result
      )
      .subscribe((data) => {
        alert("Evaluation Form sent successfully");
        this.getUserList();
      });
  }
  showQuations() {
    this.mode = "kk";
    this.displayTable = false;
  }
  Search() {
    if (
      this.userName != "" ||
      this.mobileNo != "" ||
      this.email != "" ||
      this.experience != ""
    ) {
      this.userTableData2 = this.userTableData.filter((res) => {
        return (
          res.userName
            .toLocaleLowerCase()
            .match(this.userName.toLocaleLowerCase()) ||
          res.mobileNo
            .toLocaleLowerCase()
            .match(
              this.mobileNo.toLocaleLowerCase() ||
                res.email
                  .toLocaleLowerCase()
                  .match(this.email.toLocaleLowerCase()) ||
                res.experience
                  .toLocaleLowerCase()
                  .match(this.experience.toLocaleLowerCase())
            )
        );
      });
    } else if (
      this.userName == "" ||
      this.mobileNo == "" ||
      this.email == "" ||
      this.experience == ""
    ) {
      this.getUserList();
      //this.refreshCountries();
    }
  }
  onSelectFile(files: FileList) {
    this.fileToUpload = true;
    if (files.length === 0) {
      return;
    }
    this.updatedresume = "Ariqt";
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    this.fileData = formData;
  }
  viewCompleteDeatils(viewdeatils, row) {
    this.loading = false;
    this.modalService
      .open(viewdeatils, {
        ariaLabelledBy: "modal-basic-title",
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    (<any>document.getElementById("vieworg")).value = row.currentOrgnization;
    (<any>document.getElementById("btnMobileNumerbs")).value = row.mobileNo;
    (<any>document.getElementById("viewcurrentctc")).value = row.currentCTC;
    (<any>document.getElementById("viewexpectedctc")).value =
      row.expectedSalary;
    (<any>document.getElementById("viewnoticeperiod")).value = row.noticePeriod;
    (<any>document.getElementById("viewcontactedby")).value = row.contactedby;
  }
  editCompleteDeatils(editdeatils, row) {
    if (row.examStatus == 1) {
      this.getUserId = row.userId;
      this.modalService
        .open(editdeatils, {
          ariaLabelledBy: "modal-basic-title",
        })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
      if (row.technology == "1") {
        this.selectedTechnology = ".Net Developer";
      } else if (row.technology == "2") {
        this.selectedTechnology = "Angular Developer";
      } else if (row.technology == "3") {
        this.selectedTechnology = "Fullstack Developer";
      } else if (row.technology == "4") {
        this.selectedTechnology = "Rust Developer";
      } else if (row.technology == "5") {
        this.selectedTechnology = "PHP Developer";
      } else if (row.technology == "6") {
        this.selectedTechnology = "Python Developer";
      } else if (row.technology == "7") {
        this.selectedTechnology = "VueJs";
      } else if (row.technology == "8") {
        this.selectedTechnology = "Tester";
      } else if (row.technology == "9") {
        this.selectedTechnology = "Scrum Master";
      } else if (row.technology == "10") {
        this.selectedTechnology = "Devops Engineer";
      } else if (row.technology == "11") {
        this.selectedTechnology = "Agu";
      }

      this.selectedUserStatus = row.userStatus;
      (<any>document.getElementById("txteditName")).value = row.userName;
      (<any>document.getElementById("txteditMobileNo")).value = row.mobileNo;
      (<any>document.getElementById("txteditEmail")).value = row.email;
      (<any>document.getElementById("txteditinterviewer")).value =
        row.interviewer;
      (<any>document.getElementById("txteditExperience")).value =
        row.experience;
      (<any>document.getElementById("txteditCurrentOrganization")).value =
        row.currentOrgnization;
      (<any>document.getElementById("txteditCurrentCtc")).value =
        row.currentCTC;
      (<any>document.getElementById("txteditExpectedCtc")).value =
        row.expectedSalary;
      (<any>document.getElementById("txteditNotice")).value = row.noticePeriod;
      (<any>document.getElementById("txteditContactedby")).value =
        row.contactedby;
      if (row.uploadResume != "") {
        this.filename = row.uploadResume;
      }
      (<any>document.getElementById("myFile")).selected = row.uploadResume;
    } else {
      alert("Can't Edit");
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
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
  colfilter(event) {
    if (event > 0) {
      this.userTableData2 = this.userTableData.filter((res) => {
        return (res.technology = event);
      });
    } else if (event == 0) {
      this.getUserList();
    } else if (this.emailaddr != undefined) {
      this.userTableData2 = this.userTableData.filter((res) => {
        return res.email
          .toLocaleLowerCase()
          .match(this.emailaddr.toLocaleLowerCase());
      });
    } else {
      this.getUserList();
    }
  }
  colnamefilter(event) {
    if (this.userName != undefined) {
      this.userTableData2 = this.userTableData.filter((res) => {
        return res.userName
          .toLocaleLowerCase()
          .match(this.userName.toLocaleLowerCase());
      });
    } else {
      this.getUserList();
    }
  }
  colexpfilter(expe) {
    if (expe > 0) {
      this.userTableData2 = this.userTableData.filter((res) => {
        return (res.experience = expe);
      });
    } else {
      this.getUserList();
    }
  }
  colsrcfilter(src) {
    if (src != "0") {
      this.userTableData2 = this.userTableData.filter((res) => {
        return res.source.match(src);
      });
    } else {
      this.getUserList();
    }
  }
  addCandidate() {
    this.router.navigate(["/add-candidate"]);
  }
  UpdateCandidate() {
    this.loading = true;
    var name = (<any>document.getElementById("txteditName")).value;
    var mobile = (<any>document.getElementById("txteditMobileNo")).value;
    var email = (<any>document.getElementById("txteditEmail")).value;
    var experiance = (<any>document.getElementById("txteditExperience")).value;
    var tech = <any>document.getElementById("ddledittech");
    var technology = tech.options[tech.selectedIndex].text;
    var interviewr = (<any>document.getElementById("txteditinterviewer")).value;
    var e = <any>document.getElementById("ddluserstatus");
    var userstatus = e.options[e.selectedIndex].text;
    if (technology == ".Net Developer") {
      technology = "1";
    } else if (technology == "Angular Developer") {
      technology = "2";
    } else if (technology == "Fullstack Developer") {
      technology = "3";
    } else if (technology == "Rust Developer") {
      technology = "4";
    } else if (technology == "PHP Developer") {
      technology = "5";
    } else if (technology == "Python Developer") {
      technology = "6";
    } else if (technology == "VueJs") {
      technology = "7";
    } else if (technology == "Tester") {
      technology = "8";
    } else if (technology == "Scrum Master") {
      technology = "9";
    } else if (technology == "Devops Engineer") {
      technology = "10";
    } else if (technology == "Agu") {
      technology = "11";
    } else {
      technology = "1";
    }
    var currentOrg = (<any>(
      document.getElementById("txteditCurrentOrganization")
    )).value;
    var currentCtc = (<any>document.getElementById("txteditCurrentCtc")).value;
    var expectedCtc = (<any>document.getElementById("txteditExpectedCtc"))
      .value;
    var noticeperiod = (<any>document.getElementById("txteditNotice")).value;
    var contactedby = (<any>document.getElementById("txteditContactedby"))
      .value;
    var myDate = new Date().toISOString();
    var datetimevalue = myDate.substring(0, myDate.length - 1);
    debugger;
    var result = {
      UserId: this.getUserId,
      UserName: name,
      MobileNo: mobile,
      Email: email,
      Experience: experiance,
      CreatedDate: datetimevalue,
      Technology: technology,
      Contactedby: contactedby,
      CurrentCTC: currentCtc,
      CurrentOrgnization: currentOrg,
      ExpectedSalary: expectedCtc,
      NoticePeriod: noticeperiod,
      Interviewer: interviewr,
      UserStatus: userstatus,
    };
    this.http
      .put<any>(
        "https://ariqtonlineexamappapi.azurewebsites.net/api/User/UpdateUsers",
        result
      )
      .subscribe((data) => {
        if (this.updatedresume == "Ariqt") {
          this.http
            .post(
              "https://ariqtonlineexamapi.azurewebsites.net/api/User/savefile/" +
                data.userId,
              this.fileData
            )
            .subscribe((event) => {});
        } else {
        }
        this.loading = false;
        alert("Updated successfully");
        document.getElementById("updateclose").click();
        this.getUserList();
      });
  }
  ScheduleDeatils(scheduledetails, row) {
    this.modalService
      .open(scheduledetails, {
        ariaLabelledBy: "modal-basic-title",
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  scheduleInterview(row) {
    if (row.examStatus == 3) {
      var result = JSON.stringify(row);
      this.router.navigate(["/schedule-interview"], {
        queryParams: { rowdata: result },
        skipLocationChange: true,
        replaceUrl: false,
      });
    } else {
      alert(
        "Hehe don't do smart ha..\nSchedule only for those who are complete the Exam..."
      );
    }
  }
}
