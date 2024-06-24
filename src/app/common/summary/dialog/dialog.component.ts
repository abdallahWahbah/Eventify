import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit{
  @Input() tickets: any;
  @Output() showDialoghandle = new EventEmitter<boolean>();
  showOrderSummary = false;
  email = "andreagomes@example.com"

  ngOnInit() 
  {
    this.tickets = this.tickets?.map(ticket => {
      return {...ticket, amount: 1}
    })
  }

  decrease(ticket: any, amount: any)
  {
    if(+ticket.amount === 0) return;
    amount.value--;
    ticket.amount = amount.value;
  }
  increase(ticket: any, amount: any)
  {
    +amount.value++;
    ticket.amount = amount.value;
  }
  getQuantity()
  {
    let sum = 0;
    for(let i = 0; i < this.tickets.length; i++)
    {
      sum += +this.tickets[i].amount;
    }
    return sum;
  }
  getTotal()
  {
    let sum = 0;
    for(let i = 0; i < this.tickets.length; i++)
    {
      sum += this.tickets[i].price * this.tickets[i].amount;
    }
    return sum;
  }
  setShowOrderSummary(boolVal: boolean)
  {
    this.showOrderSummary = boolVal;
  }
}
