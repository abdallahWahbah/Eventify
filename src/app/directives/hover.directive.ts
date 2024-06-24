import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  @Input() defaultColor: string;
  @Input() hoverColor: string;
  @HostBinding("style.color") hoverStyle: string;

  constructor() {}

  @HostListener("mouseenter") mouseenter()
  {
    this.hoverStyle = this.hoverColor;
  }
  @HostListener("mouseleave") mousleave()
  {
    this.hoverStyle = this.defaultColor;
  }

}
