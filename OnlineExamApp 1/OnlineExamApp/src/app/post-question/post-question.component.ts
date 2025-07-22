import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-post-question',
    templateUrl: './post-question.component.html',
    styleUrls: ['./post-question.component.css'],
    standalone: true,
    imports : [CommonModule,FormsModule,ReactiveFormsModule]
})
export class PostQuestionComponent implements OnInit {

  registerForm: UntypedFormGroup;
  submitted = false;
  loading: boolean;
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
  collectionSize: any;
  complexities: any;
  questionsdata: any;
  selectedComplexity: any;
  selectedQuestionType: any;
  usersQuestionsDataPagination1: any;
  usersQuestionsDataPagination2: any;
  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal, private formBuilder: UntypedFormBuilder) {

  }

  ngOnInit() {
    this.displayQuestiontable = true;
    this.addFieldValue(this.index);
    this.isEditItems = !this.isEditItems;
    this.registerForm = this.formBuilder.group({
      questionName: ['', Validators.required],
      complexity: ['', Validators.required],
      type: ['', Validators.required],
    },
    );
  }
  get f() { return this.registerForm.controls; }
  postQuestion() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else {
      this.loading=true;
      var questionname = (<any>(document.getElementById('txtquestionName'))).value;
      var questionType = (<any>(document.getElementById('ddltype'))).value;
      var complexity = (<any>(document.getElementById('ddlComplexity'))).value;
      var technology = (<any>(document.getElementById('ddltechnology'))).value;
      var getUserName = localStorage.getItem('Blog');

      if (questionType == 2) {
        var result = { Question: questionname, QuestionType: questionType, Complexity: complexity, Technology: technology, Uploadedby:getUserName,Status:'Review',Approvedby:'No One'};
        this.http.post<any>('https://ariqtonlineexamapi.azurewebsites.net/api/Question', result).subscribe(data => {
          alert("Question added Successfully");
          this.loading=false;
          this.router.navigate(['/questions']);
          this.fieldArray = [];
        });
      }
      else if (questionType == 1) {
        this.actionChoices = [];
        for (var i = 1; i <= this.fieldArray.length; i++) {
          var choices = { "choices": (<any>(document.getElementById('field' + i))).value, "isCorrect": (<any>(document.getElementById('colval' + i))).value };

          this.actionChoices.push(choices);
        }
        var results = { Question: questionname, QuestionType: questionType, Complexity: complexity, Technology: technology, Uploadedby:getUserName,Status:'Review',Approvedby:'No One'};
        this.http.post<any>('https://ariqtonlineexamapi.azurewebsites.net/api/Question', results).subscribe(data => {

          var questionOptions = [];
          for (var j = 0; j < this.actionChoices.length; j++) {
            var option = {
              "Option": this.actionChoices[j].choices,
              "QuestionId": data.questionId,
              "IsCorrect": this.actionChoices[j].isCorrect
            }
            questionOptions.push(option);
          }

          this.http.post<any>('https://ariqtonlineexamapi.azurewebsites.net/api/Choice/Bulk', questionOptions).subscribe(data => {
            (<any>(document.getElementById('txtquestionName'))).value = '';
            alert("Question added Successfully");
            this.loading=false;
            this.router.navigate(['/questions']);
          },
          )
        },
        )
        this.fieldArray = [];
      }
      else if (questionType == 3) {

        var progratextbox = (<any>(document.getElementById('txtquestionProgram'))).value;
        this.questionsdata = { question: questionname, questionType: 3, complexity: complexity, Technology: technology, Uploadedby:getUserName,Status:'Review',Approvedby:'No One' };
        this.http.post<any>('https://ariqtonlineexamapi.azurewebsites.net/api/Question', this.questionsdata).subscribe(data => {

          var questionOptions = [];
          var option = {
            "Option": progratextbox,
            "QuestionId": data.questionId,
            "IsCorrect": false
          }
          questionOptions.push(option);

          this.http.post<any>('https://ariqtonlineexamapi.azurewebsites.net/api/Choice/Bulk', questionOptions).subscribe(data => {
            alert("Question added Successfully");
            this.loading=false;
            this.router.navigate(['/questions']);
          },
          )
        },
        )
        this.fieldArray = [];
      }
    }
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
  displayPage() {
    this.displayAddQuestionPage = true;
    this.displayQuestiontable = false;
  }
  selectQuetionsType() {

    var questiontype = (<any>(document.getElementById('ddltype'))).value;
    if (questiontype == 1) {
      this.displaychoiceData = true;
      this.programedittext = false;
    }
    else if (questiontype == 2) {
      this.displaychoiceData = false;
      this.programedittext = false;
    }
    else {
      this.programedittext = true;
      this.fieldArray = [];
      this.displaychoiceData = false;
    }
  }
}
