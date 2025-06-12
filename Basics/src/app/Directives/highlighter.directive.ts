import { Directive, ElementRef, inject, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[nghighLight]'
})

export class SetBackground implements OnInit {
  // constructor(private element : ElementRef){
  //   element.nativeElement.style.backgroundColor = 'red';
  //   element.nativeElement.style.color = 'white';
  // }
    private element : ElementRef = inject(ElementRef)
    private render : Renderer2 = inject(Renderer2)
    ngOnInit() {
    // this.element.nativeElement.style.backgroundColor = 'black';
    // this.element.nativeElement.style.color = 'white';
    // this.render.setStyle(this.element.nativeElement,'backgroundColor','red')
    // this.render.setStyle(this.element.nativeElement,'color','white')
    this.render.setAttribute(this.element.nativeElement,'title','Delete User')
  }
}
