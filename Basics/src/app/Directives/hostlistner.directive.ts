import { Directive, ElementRef, HostBinding, HostListener, inject, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector : '[appHost]'
})

export class HostEx{
  private element : ElementRef = inject(ElementRef)
  private renderer : Renderer2 = inject(Renderer2)

  // @HostListener('mouseenter') onMouseEnter(){
  //   this.renderer.addClass(this.element.nativeElement,'text')
  // }
  // @HostListener('mouseleave') onMouseLeave(){
  //   this.renderer.removeClass(this.element.nativeElement,'text')
  // }
  // @HostListener('mouseenter') onMouseEnter(){
  //   this.renderer.setStyle(this.element.nativeElement,'backgroundColor',this.color)
  // }
  // @HostListener('mouseleave') onMouseLeave(){
  //   this.renderer.removeStyle(this.element.nativeElement,'backgroundColor')
  // }
  @Input({required:true,alias:'appHost'}) appHosttt: string = ''

  //  @HostListener('mouseenter') onMouseEnter(){
  //   this.renderer.setStyle(this.element.nativeElement,'color',this.appHost)
  // }
  //  @HostListener('mouseleave') onMouseLeave(){
  //   this.renderer.removeStyle(this.element.nativeElement,'color')
  // }
  @HostListener('keyup',['$event']) changeFont(e: KeyboardEvent){
    if(e.key === 'Enter'){
      this.renderer.setStyle(this.element.nativeElement,'font-weight','bolder')
      this.renderer.setStyle(this.element.nativeElement,'color',this.appHosttt)
    }else{
      this.renderer.removeStyle(this.element.nativeElement,'font')
      this.renderer.removeStyle(this.element.nativeElement,'color')
    }
  }
  @HostBinding('style.color') color : string = 'red'
}
