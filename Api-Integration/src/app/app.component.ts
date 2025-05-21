import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostComponent } from "./post/post.component";
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Api-Integration';
}
