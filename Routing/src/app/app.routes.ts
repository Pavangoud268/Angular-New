import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { ContactComponent } from './contact/contact.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UserComponent } from './home/user/user.component';
import { ShowActivityComponent } from './show-activity/show-activity.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { LoginComponent } from './login/login.component';
import { CanActivate, resolve } from '../../auth.guard';


export const routes: Routes = [
  //{path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'',component:HomeComponent},
  {path:'Home',component:HomeComponent,title:'Home'},
  {path:'About',title:'About',loadComponent: ()=>
    import('./about/about.component').then(m=>m.AboutComponent)
  },
  {path:'info',redirectTo:'Subscribe',pathMatch:'prefix'},
  {path:'Service',component:ContactComponent,title:'Service',resolve:{courses : resolve}},
  // {path:'Service/:id',component:ShowActivityComponent},
  {path:'Service',canActivateChild:[CanActivate],children:[
    {path:':id',component:ShowActivityComponent,title:'Service',resolve:{course : resolve}},
    {path:'User',component:UserComponent},

  ]},
  {path:'Login',component:LoginComponent,title:'Login'},
  {path:'Subscribe',component:SubscribeComponent,canActivate:[CanActivate],
    title:'Subscribe',canDeactivate:[(comp : SubscribeComponent)=>{return comp.canExit()}]},
  {path:'Exercise',component:ExerciseComponent,title:'Exercise'},
  {path:'user',component:UserComponent},
  {path:'**',component:NotFoundComponentComponent,title:'Error-404'}
];
