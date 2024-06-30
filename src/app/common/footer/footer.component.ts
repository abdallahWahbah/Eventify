import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() numberToIncrease: number;
  @Output() increaseNumber = new EventEmitter<number>();

  handleClick()
  {
    this.numberToIncrease = 12;
    this.increaseNumber.emit(this.numberToIncrease)
  }
}
