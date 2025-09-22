import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRequiredAsterisk]'
})
export class AppRequiredAsterisk implements OnInit
{

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    // Solo agrega el asterisco si no existe ya
    const hasAsterisk = this.el.nativeElement.innerHTML.includes('*');
    if (!hasAsterisk) {
      const asterisk = this.renderer.createElement('span');
      this.renderer.setStyle(asterisk, 'color', 'red');
      this.renderer.setProperty(asterisk, 'textContent', ' *');
      this.renderer.appendChild(this.el.nativeElement, asterisk);
    }
  }

}
