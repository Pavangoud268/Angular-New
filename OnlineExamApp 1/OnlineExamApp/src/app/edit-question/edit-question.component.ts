import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-question',
    templateUrl: './edit-question.component.html',
    styleUrls: ['./edit-question.component.css'],
    standalone: true,
    imports : [FormsModule]
})
export class EditQuestionComponent implements OnInit {

  rowdata: any;
  index: any;
  actionChoices: any;
  getQuestionType: any;
  newAttribute: any = {};
  selectedComplexity: any;
  public options: string[] = ["low", "medium", "high"];
  public questionTypes: string[] = ["MultipleChoice", "Correct the Program"];
  public technologyTypes: string[] = [".Net Developer", "Angular Developer"];
  public datatypesChoice: string[] = ["true", "false"];
  isEditItems: boolean;
  displaychoiceData: boolean = true;
  fieldArray: Array<any> = [];
  selectedTechnology: any;
  selectedddldatatypesChoice1:any;
  selectedddldatatypesChoice2:any;
  selectedddldatatypesChoice3:any;
  selectedddldatatypesChoice4:any;
  programedittextdata: boolean = true;
  selectedQuestionType: any;
  individualoptions:boolean=true;
  questionsdata: any;
  constructor(private activatedroute: ActivatedRoute, private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.activatedroute.queryParams.subscribe(data => {

      this.rowdata = JSON.parse(data.rowdata);
      console.log("@@@" + JSON.parse(data.rowdata).question + "@@");
    })
  }
  ngOnInit(): void {


    //(<any>(document.getElementById('txtquestionName'))).value=this.rowdata.question;
  }
  ngAfterViewInit() {

    this.isEditItems = !this.isEditItems;
    this.fieldArray = [];

    (<any>(document.getElementById('txtquestionName'))).value = this.rowdata.question;
    if (this.rowdata.complexity == "low") {
      this.selectedComplexity = "low";
    }
    else if (this.rowdata.complexity == "medium") {
      this.selectedComplexity = "medium";
    }
    else if (this.rowdata.complexity == "high") {
      this.selectedComplexity = "high";
    }
    if (this.rowdata.technology == "1") {
      this.selectedTechnology = ".Net Developer";
    }
    else if (this.rowdata.technology == "2") {
      this.selectedTechnology = "Angular Developer";
    }
    if (this.rowdata.questionType == "1") {

      this.selectedQuestionType = "MultipleChoice";
      this.displaychoiceData = true;
      this.programedittextdata = false;
      this.individualoptions=true;
      this.addFieldValue(this.index);
      this.addFieldValue(this.index);
      this.addFieldValue(this.index);
      this.addFieldValue(this.index);
      this.actionChoices = [];
      var ss = this.fieldArray.length;

      for (var i = 0; i <= this.fieldArray.length; i++) {
        (<any>(document.getElementById('txtopt1'))).value = this.rowdata.choices[0].option;
        (<any>(document.getElementById('txtopt2'))).value = this.rowdata.choices[1].option;
        (<any>(document.getElementById('txtopt3'))).value = this.rowdata.choices[2].option;
        (<any>(document.getElementById('txtopt4'))).value = this.rowdata.choices[3].option;
        this.selectedddldatatypesChoice1=this.rowdata.choices[0].isCorrect;
        this.selectedddldatatypesChoice2=this.rowdata.choices[1].isCorrect;
        this.selectedddldatatypesChoice3=this.rowdata.choices[2].isCorrect;
        this.selectedddldatatypesChoice4=this.rowdata.choices[3].isCorrect;
      }
    }
    else if (this.rowdata.questionType == "3") {

      this.individualoptions=false;
      this.selectedQuestionType = "Correct the Program";
      this.displaychoiceData = false;
      this.programedittextdata = true;
      this.getQuestionType = this.rowdata.questionType;
      console.log("@@@" + this.rowdata.choices[0].option + "@@");
      (<any>(document.getElementById('txtquestionProgram'))).value = this.rowdata.choices[0].option;
    }
  }
  updateQuestion() {
    alert("Question Updated Successfully");
    this.router.navigate(['/questions']);
    // if (this.getQuestionType == 3) {
    //   debugger
    //   var progratextbox = (<any>(document.getElementById('txtquestionProgram'))).value;
    //   var questionname = (<any>(document.getElementById('txtquestionName'))).value;
    //   var complexity = (<any>(document.getElementById('selectedComplexity'))).value;
    //   var technology = (<any>(document.getElementById('ddlTechnology'))).value;

    //   this.questionsdata = { question: questionname, questionType: 3, complexity: complexity, Technology: technology };
    //   this.http.put<any>('https://ariqtonlineexamapi.azurewebsites.net/api/Question', this.questionsdata).subscribe(data => {
    //     debugger
    //     var questionOptions = [];
    //     var option = {
    //       "Option": progratextbox,
    //       "QuestionId": data.questionId,
    //       "IsCorrect": false
    //     }
    //     questionOptions.push(option);
    //     debugger
    //     this.http.put<any>('https://ariqtonlineexamapi.azurewebsites.net/api/Choice/Bulk', questionOptions).subscribe(data => {
    //       alert("Question added Successfully");
    //       location.reload();

    //     },
    //     )
    //   },
    //   )
    //   this.fieldArray = [];
    // }

  }
  selectQuetionsType() {

    // var questiontype = (<any>(document.getElementById('ddlQuestionType'))).value;
    // if (questiontype == 1) {
    //   this.displaychoiceData = true;
    //   this.programedittext = false;
    // }
    // else if (questiontype == 2) {
    //   this.displaychoiceData = false;
    //   this.programedittext = false;
    // }
    // else {
    //   this.programedittext = true;
    //   this.fieldArray = [];
    //   this.displaychoiceData = false;
    // }
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


}
