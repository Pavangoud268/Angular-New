import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostComponent } from "./post/post.component";
import { FormComponent } from "./form/form.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Api-Integration';
}
