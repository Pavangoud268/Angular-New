import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbPagination }
  from '@ng-bootstrap/ng-bootstrap';
import { PostQuestionComponent } from '../post-question/post-question.component';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css'],
    standalone: true,
    imports : [CommonModule,FormsModule,NgbPagination,MatSpinner,PostQuestionComponent]
})
export class QuestionsComponent implements OnInit {
  registerForm: UntypedFormGroup;
  loadspinner = false;
  submitted = false;
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  newAttributeEdit: any = {};
  isEditItems: boolean;
  isEditItemsEdit: boolean;
  index: any;
  indexEdit: any;
  actionChoices: any;
  questionTableData: any;
  actiontrueorFalse: any;
  displayAddQuestionPage: boolean = false;
  displayQuestiontable: boolean = false;
  displaychoiceData: boolean = false;
  displaychoiceDataEdit: boolean = false;
  programedittext: boolean = false;
  programedittextEdit: boolean = false;
  questionsObject: any;
  question: string;
  closeResult = '';
  page = 1;
  pageSize = 15;
  collectionSize: any;
  complexities: any;
  questionsdata: any;
  selectedComplexity: any;
  selectedQuestionType: any;
  usersQuestionsDataPagination1: any;
  usersQuestionsDataPagination2: any;
  showPostQuestion = false;
  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal, private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit() {
    this.displayQuestiontable = true;
    this.getQuestions();
    this.addFieldValue(this.index);
    this.isEditItems = !this.isEditItems;
  }
  refreshCountries() {

    this.usersQuestionsDataPagination2 = this.usersQuestionsDataPagination1
      .map((sai, i) => ({ id: i + 1, ...sai }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  onEditCloseItems() {
    this.isEditItems = !this.isEditItems;
  }
  deleteFieldValue(index: any) {
    this.fieldArray.splice(index, 1);
  }
  addFieldValue(index) {

    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }
  Search() {
    if (this.question != "") {
      this.usersQuestionsDataPagination2 = this.usersQuestionsDataPagination1.filter(res => {
        return res.question.toLocaleLowerCase().match(this.question.toLocaleLowerCase());
      });
    }
    else if (this.question == "") {
      this.getQuestions()
    }
  }
  getQuestions() {

    this.loadspinner = true;
    this.http.get<any>('https://ariqtonlineexamapi.azurewebsites.net/api/Question').subscribe(data => {

      this.loadspinner = false;
      this.questionTableData = data;
      this.usersQuestionsDataPagination1 = data;
      this.usersQuestionsDataPagination2 = data;
      this.collectionSize = this.usersQuestionsDataPagination2.length;
      this.refreshCountries();
    });
  }
  getFilteredQuestions(complexity, technology, questionType) {

    this.http.get<any>('https://ariqtonlineexamapi.azurewebsites.net/api/Question').subscribe(data => {

      this.usersQuestionsDataPagination2 = [];
      this.usersQuestionsDataPagination1 = [];
      if (complexity == "" && technology == "" && questionType == "") {
        this.usersQuestionsDataPagination2 = data;
        this.usersQuestionsDataPagination1 = data;
      }
      else if (complexity == "" && technology != "" && questionType == "") {
        for (var i = 0; i < data.length; i++) {
          if (data[i].technology == technology) {
            this.usersQuestionsDataPagination2.push(data[i]);
            this.usersQuestionsDataPagination1.push(data[i]);
          }
        }
      }
      else if (complexity != "" && technology == "" && questionType == "") {
        for (var i = 0; i < data.length; i++) {
          if (data[i].complexity == complexity) {
            this.usersQuestionsDataPagination2.push(data[i]);
            this.usersQuestionsDataPagination1.push(data[i]);
          }
        }
      }

      else if (complexity == "" && technology == "" && questionType != "") {
        for (var i = 0; i < data.length; i++) {
          if (data[i].questionType == questionType) {
            this.usersQuestionsDataPagination2.push(data[i]);
            this.usersQuestionsDataPagination1.push(data[i]);
          }
        }
      }
      else if (complexity != "" && technology != "" && questionType == "") {
        for (var i = 0; i < data.length; i++) {
          if (data[i].complexity == complexity && data[i].technology == technology) {
            this.usersQuestionsDataPagination2.push(data[i]);
            this.usersQuestionsDataPagination1.push(data[i]);
          }
        }
      }

      else if (complexity != "" && technology == "" && questionType != "") {
        for (var i = 0; i < data.length; i++) {
          if (data[i].complexity == complexity && data[i].questionType == questionType) {
            this.usersQuestionsDataPagination2.push(data[i]);
            this.usersQuestionsDataPagination1.push(data[i]);
          }
        }
      }

      else if (complexity == "" && technology != "" && questionType != "") {
        for (var i = 0; i < data.length; i++) {
          if (data[i].technology == technology && data[i].questionType == questionType) {
            this.usersQuestionsDataPagination2.push(data[i]);
            this.usersQuestionsDataPagination1.push(data[i]);
          }
        }
      }
      else if (complexity != "" && technology != "" && questionType != "") {
        for (var i = 0; i < data.length; i++) {
          if (data[i].complexity == complexity && data[i].technology == technology && data[i].questionType == questionType) {
            this.usersQuestionsDataPagination2.push(data[i]);
            this.usersQuestionsDataPagination1.push(data[i]);
          }
        }
      }
      this.collectionSize = this.usersQuestionsDataPagination1.length;
      this.refreshCountries();

    });
  }
  displayPage() {

    this.router.navigate(['/post-question']);
  }

  keyPressAlphaNumeric(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z0-9\s]*$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  backPage() {

    location.reload();
  }
  getFilterQuestions() {


    var complexity = (<any>(document.getElementById('ddlFliterComplexity'))).value;
    var technology = (<any>(document.getElementById('ddlFlitertechnology'))).value;
    var questionType = (<any>(document.getElementById('ddlFlitertype'))).value;
    this.getFilteredQuestions(complexity, technology, questionType);

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
  editQuestions(row) {
    var result = JSON.stringify(row);
    this.router.navigate(['/edit-question'], { queryParams: { rowdata: result }, skipLocationChange: true, replaceUrl: false });
  }
  ApproveQuestion(row) {

    var getUserName = localStorage.getItem('Blog');
    var results = { QuestionId: row.questionId, Status: 'Approved',Approvedby: getUserName};
    this.http.put<any>('https://ariqtonlineexamapi.azurewebsites.net/api/Question/ApproveQuestion', results).subscribe(data => {

      alert("Approved successfully");
      this.getQuestions();
    });
  }
}
