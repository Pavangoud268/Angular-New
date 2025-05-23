import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { InternComponent } from './intern/intern.component';
import { ApiCallsService, data } from './Service/api-calls.service';

export const routes: Routes = [
  {path: '',component:HomeComponent,title:'Home'},
  {path: 'interns',component:PostComponent,title:'Interns',resolve:{data : data}},
  {path: 'interns',children:[
    {path:':id',component:InternComponent,title:'Intern'}
  ]},
  {path:'form',component: FormComponent,title:'Add New Intern'}
];
