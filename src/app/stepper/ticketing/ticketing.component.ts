import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../pages/events/events.service';

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrl: './ticketing.component.scss'
})
export class TicketingComponent implements OnInit{
  @Output() formInitialized = new EventEmitter<FormGroup>();
  @Input() ticketingForm: FormGroup;
  @Input() editableEvent: Event;

  eventTypes = [
    {
      type: "Ticketed Event",
      desc: "My event requires tickets for entry",
      iconName: "attach_money"
    },
    {
      type: "Free Event",
      desc: "I am running a free event",
      iconName: "check"
    }
  ]

  ngOnInit()
  {
    this.ticketingForm = new FormGroup({
      type: new FormControl(this.editableEvent?.type || "", [Validators.required]), // Free Event, Ticketed Event
      tickets: new FormArray(
        (this.editableEvent?.tickets.map(ticket => {
          return new FormGroup({
            name: new FormControl(ticket.name, [Validators.required]),
            price: new FormControl(ticket.price, [Validators.required]),
          })
        })
        || []
      ))
    })
    // to add initial state (name, price) with validators for the array
    this.ticketingForm.get("type").valueChanges.subscribe(value => {
      if(value === "Ticketed Event")
      {
        if(this.ticketsControls.length === 0)
        {
          this.addTicket();
        }
        this.ticketsControls.forEach(ticketControl => {
          ticketControl.get("name").setValidators([Validators.required]);
          ticketControl.get("price").setValidators([Validators.required]);
          ticketControl.updateValueAndValidity();
        })
      }
      else
      {
        this.ticketsControls.forEach(ticketControl => {
          ticketControl.get("name")?.setValidators(null);
          ticketControl.get("price")?.setValidators(null);
          ticketControl.updateValueAndValidity();
        })
      }
    })
    this.formInitialized.emit(this.ticketingForm);
  }


  get ticketsControls()
  {
    return (<FormArray>this.ticketingForm.get("tickets")).controls
  }
  addTicket()
  {
    const newTicket = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });
    (<FormArray>this.ticketingForm.get("tickets")).push(newTicket)
  }
}
