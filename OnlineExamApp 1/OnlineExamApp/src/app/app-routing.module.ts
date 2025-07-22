import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { QuestionsComponent } from './questions/questions.component';
import { AdminComponent } from './admin/admin.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { PostQuestionComponent } from './post-question/post-question.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { InterviewEvaluationFormComponent } from './interview-evaluation-form/interview-evaluation-form.component';
import { NewCandidateComponent } from './new-candidate/new-candidate.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [
      MsalGuard
    ]
  },

  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'interview-evaluation',
    component:InterviewEvaluationFormComponent
  },
  {
    path: 'new-candidate',
    component:NewCandidateComponent
  },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'menu',
    component: MenuBarComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'app-login-user',
    component: LoginUserComponent
  },
  {
    path: 'app-profile',
    component: ProfileComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'edit-question',
    component: EditQuestionComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'post-question',
    component: PostQuestionComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'add-candidate',
    component: AddCandidateComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'candidate-profile',
    component: CandidateProfileComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'schedule-interview',
    component: ScheduleInterviewComponent,
    canActivate: [
      MsalGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
