import { Component } from '@angular/core';
import { RefsComponent } from './refs/refs.component';
import { LifecycleHooksComponent } from './lifecycle-hooks/lifecycle-hooks.component';
import { CommonModule } from '@angular/common';
import { ContentProjectionComponent } from './content-projection/content-projection.component';

@Component({
  selector: 'app-root',
  imports: [RefsComponent,LifecycleHooksComponent,CommonModule,ContentProjectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Essentials';
  change(el : HTMLInputElement){
    this.title = el.value
  }
  toDestroy : boolean = true
  destroy(){
    this.toDestroy = !this.toDestroy
  }
}
