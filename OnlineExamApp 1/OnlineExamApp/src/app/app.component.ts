import { CommonModule } from "@angular/common";
import { Component, inject, Injector, OnInit } from "@angular/core";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
} from "@azure/msal-browser";
import { Subject } from "rxjs";
//import { Subscription } from 'rxjs';
import { filter, takeUntil } from "rxjs/operators";
import { QuizComponent } from "./quiz/quiz.component";
import { InterviewEvaluationFormComponent } from "./interview-evaluation-form/interview-evaluation-form.component";
import { NewCandidateComponent } from "./new-candidate/new-candidate.component";
import { QuestionsComponent } from "./questions/questions.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { MenuBarComponent } from "./menu-bar/menu-bar.component";
import { MatToolbar } from "@angular/material/toolbar";
import { LoginUserComponent } from "./login-user/login-user.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    QuizComponent,
    InterviewEvaluationFormComponent,
    NewCandidateComponent,
    QuestionsComponent,
    UnauthorizedComponent,
    MenuBarComponent,
    MatToolbar,
    RouterOutlet,
    RouterModule,
    LoginUserComponent
  ],
})
export class AppComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  title = "Exam";
  isIframe = false;
  loggedIn = false;
  getusername: any;
  navLinks: any[];
  activeLinkIndex = -1;
  roles: any;
  //public subscription!: Subscription;
  public isLoggedIn = false;
  public isAuthorized = true;
  public isAdmin = false;
  public isDeveloper = false;
  public isReader = false;
  activeUser: string | undefined = "unknown user";
  headerInfo: any;
  public isCandidate = false;
  isQuiz = false;
  isInterviewEvaluationForm = false;
  isNewCandidate = false;
  isMenu = false;
  msalBroadcastService = inject(MsalBroadcastService);
  msalervice = inject(MsalService)
  router = inject(Router)
  constructor(
    //private msalBroadcastService: MsalBroadcastService,
    //private msalervice: MsalService,
    //private router: Router,
    //private injector: Injector
  ) {}

  ngOnInit() {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        this.setAuthenticationStatus();
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (message: EventMessage) =>
            message.eventType === EventType.LOGIN_SUCCESS
        ),
        takeUntil(this.unsubscribe)
      )
      .subscribe((message: EventMessage) => {
        const authResult = message.payload as AuthenticationResult;
        this.msalervice.instance.setActiveAccount(authResult.account);
      });

    this.isIframe = window !== window.parent && !window.opener;
    var domain = location.href;
    if (domain.includes("app-login-user")) {
      this.isCandidate = true;
      this.isMenu = true;
      this.isQuiz = false;
      this.isInterviewEvaluationForm = false;
      this.isNewCandidate = false;
    }
    if (domain.includes("quiz")) {
      this.isQuiz = true;
      this.isMenu = true;
      this.isCandidate = false;
      this.isInterviewEvaluationForm = false;
      this.isNewCandidate = false;
    }
    if (domain.includes("interview-evaluation")) {
      this.isQuiz = false;
      this.isMenu = true;
      this.isCandidate = false;
      this.isInterviewEvaluationForm = true;
      this.isNewCandidate = false;
    }
    if (domain.includes("new-candidate")) {
      this.isQuiz = false;
      this.isMenu = true;
      this.isCandidate = false;
      this.isInterviewEvaluationForm = false;
      this.isNewCandidate = true;
    }

    if (this.loggedIn) {
      var userData = this.getAccount();
      this.roles = userData.idTokenClaims.roles;

      if (this.roles !== undefined && this.roles.length > 0) {
        this.isAuthorized =
          this.roles.find(
            (x: string) =>
              x.toLowerCase() === "admin" || x.toLowerCase() === "developer"
          ).length > 0;
        if (this.roles.find((x: string) => x.toLowerCase() === "admin"))
          this.isAdmin = true;
        else if (
          this.roles.find((x: string) => x.toLowerCase() === "developer")
        )
          this.isDeveloper = true;
        else this.isAuthorized = false; //this.roles.find((x: string) => x.toLowerCase() === "support" || x.toLowerCase() === "superuser" || x.toLowerCase() === "reader").length > 0;
      } else {
        this.isAuthorized = false;
      }
      this.headerInfo = {
        userName: userData?.username,
        name: userData.name,
        isLoggedIn: this.loggedIn,
      };

      this.getusername = userData.name;
      if (this.isAuthorized) {
        let key = userData.name;
        localStorage.setItem("Blog", key);
        this.router.navigate(["/users"]);
      }
    } else {
      this.headerInfo = {
        userName: "",
        name: "",
        isLoggedIn: this.loggedIn,
      };
    }

    // this.authService.handleRedirectCallback((authError, response) => {

    //   if (authError) {
    //     console.error('Redirect Error: ', authError.errorMessage);
    //     return;
    //   }

    //   console.log('Redirect Success: ', response.accessToken);
    // });

    // this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {

    //   console.log('MSAL Logging: ', message);
    //   if(message.includes("Processing the callback from redirect response"))
    //   {
    //     location.reload();
    //   }

    // }, {

    //   correlationId: CryptoUtils.createNewGuid(),
    //   piiLoggingEnabled: false
    // }));
  }
  setAuthenticationStatus(): void {
    debugger;
    let activeAccount = this.msalervice.instance.getActiveAccount();
    if (
      !activeAccount &&
      this.msalervice.instance.getAllAccounts().length > 0
    ) {
      activeAccount = this.msalervice.instance.getAllAccounts()[0];
      this.msalervice.instance.setActiveAccount(activeAccount);
    }
    this.loggedIn = !!activeAccount;
    this.activeUser = activeAccount?.username;
  }

  getAccount() {
    return this.msalervice.instance.getActiveAccount();
  }

  login() {
    this.msalervice.instance.loginRedirect({
      scopes: ["user.Read"],
    });
  }

  logout() {
    this.msalervice.instance.logoutRedirect();
  }
}
