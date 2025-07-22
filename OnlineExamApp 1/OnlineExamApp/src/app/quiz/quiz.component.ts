import { Component, HostListener, inject, OnInit } from '@angular/core';

import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { examQuestion } from '../models/examQuestion';
import { choice } from '../models/choice';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css'],
    providers: [QuizService],
    standalone: true,
    imports : [CommonModule,FormsModule]
})
export class QuizComponent implements OnInit {
  quizes: any[];
  userId: any;
  userdata: any;
  tabopen: boolean = false;
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  code: string;
  receivedData: string | null = null;
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 2700,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  quizService = inject(QuizService)
  http = inject(HttpClient)
  constructor(private activatedroute: ActivatedRoute,private helpservice:HelperService ) {

    // this.activatedroute.queryParams.subscribe(data => {
    //   this.userId=data.id;
    // })
  }

  ngOnInit() {

    var domain = location.href;
    var domainArray = domain.split('=');
    this.userId = domainArray[1];
    this.getuser();

  }
  getuser() {
debugger
    this.http.get<any>('https://ariqtonlineexamapi.azurewebsites.net/api/User/' + this.userId).subscribe(data => {
      debugger
      this.userdata = data;
      var examdate = <any>new Date(this.userdata.createdDate);
      var curdate = <any>new Date();
      var hours = Math.abs(examdate - curdate) / 36e5;
      if (hours <= 48) {

        if (this.userdata.examStatus == 2) {
          this.loadQuiz(this.userdata.technology);
        }
        else {
          var userdata = this.userdata;

          userdata.examStatus = 3;
          this.http.put<any>("https://ariqtonlineexamapi.azurewebsites.net/api/User/", userdata).subscribe(data => {

          });
        }
      }
      else {
        var userdata = this.userdata;

        userdata.examStatus = 4;
        this.http.put<any>("https://ariqtonlineexamapi.azurewebsites.net/api/User/", userdata).subscribe(data => {

        });
      }
    })
  }

  loadQuiz(technologyid) {
    // technologyid=2;
    this.quizService.get("https://ariqtonlineexamapi.azurewebsites.net/api/Question/technology/" + technologyid).subscribe(res => {

      var qstns = [];
      if (this.userdata.experience <= 100) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].complexity == "low") {
            qstns.push(res[i]);
          }
        }
      }
      else if (this.userdata.experience > 101 && this.userdata.experience <= 200) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].complexity == "medium") {
            qstns.push(res[i]);
          }
        }
      }
      else if (this.userdata.experience > 200) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].complexity == "high") {
            qstns.push(res[i]);
          }
        }
      }
      var resdata = { "id": 1, "name": "Online test", "description": ".Net Quiz (Basic Multiple Choice Questions for .Net Developers)", "questions": qstns };

      this.quiz = new Quiz(resdata);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {

    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.http.get<any>('https://ariqtonlineexamapi.azurewebsites.net/api/User/' + this.userId).subscribe(data => {

        var examStatus = data.examStatus;
        if (examStatus == 2) {
          this.onSubmit();
        }
      });

    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }



  onSelect(question: examQuestion, option: choice) {

    question.choices.forEach((x) => { if (x.choiceId !== option.choiceId) x.selected = false; });
    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }
  ontext(question: examQuestion) {

    question.code = (<any>(document.getElementById(question.questionId.toString()))).value;
    // if(question.questionType==3 && question.choices.length==1)
    // {
    //   question.choices[0].code=(<any>(document.getElementById(question.questionId.toString()))).value;
    // }
    // else if(question.questionType==3 && question.choices.length==0)
    // {
    //   question.code=(<any>(document.getElementById(question.questionId.toString()))).value;
    // }
    // else
    // {
    //   question.code=(<any>(document.getElementById(question.questionId.toString()))).value;
    // }

  }

  goTo(index: number) {

    var data = this.quiz.questions;
    if (data[index].questionType == 3 && data[index].choices.length == 0) {
      this.code = data[index].code;
    }
    if (data[index].questionType == 3 && data[index].choices.length == 1) {
      this.code = data[index].choices[0].option;
    }
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: examQuestion) {

    return question.choices.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: examQuestion) {


    return question.choices.every(x => x.selected === x.isCorrect) ? 'correct' : 'wrong';
  };

  @HostListener('window:blur', ['$event'])
  onBlur(event:Event) {

    event.preventDefault();
    console.log(event)

    console.log('BeforeUnloadEvent');
    debugger
    if(this.tabopen==false)
    {
      this.onSubmit();
    }
  }
  onSubmit() {

    this.tabopen = true;
    let answers = [];

    this.quiz.questions.forEach(x => answers.push({ 'UserId': this.userdata.userId, 'QuestionId': x.questionId, 'ChoiceId': null, 'QuestionType': x.questionType, 'Code': JSON.stringify(x.code) }));
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].QuestionType == 1) {
        for (var a = 0; a < this.quiz.questions[i].choices.length; a++) {
          if (this.quiz.questions[i].choices[a].selected === true) {
            answers[i].ChoiceId = this.quiz.questions[i].choices[a].choiceId;
          }
        }
      }
    }

    var userdata = this.userdata;
    userdata.examStatus = 3;
    this.http.put<any>("https://ariqtonlineexamapi.azurewebsites.net/api/User/", userdata).subscribe(data => {

      this.quizService.post("https://ariqtonlineexamapi.azurewebsites.net/api/Answer", answers).subscribe(res => {
      });
      this.quizService.post("https://ariqtonlineexamapi.azurewebsites.net/api/User/SendReturnMailtoHr", userdata).subscribe(res => {

      });


    },
    )

    // Post your data to the server here. answers contains the questionId and the users' answer.

    console.log(this.quiz.questions);
    this.mode = 'result';

  }
}
