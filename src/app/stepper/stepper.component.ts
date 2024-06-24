import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../auth/auth.service';
import { Event, EventsService } from '../pages/events/events.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnInit{

  detailsForm: FormGroup;
  imageForm: FormGroup;
  ticketingForm: FormGroup;
  fileUrl: any;
  currentUser: User;
  summary: any = {};
  isLoading = false;
  idParam: string;
  editableEvent: Event;
  allowEdit: boolean;
  
  constructor(
              private eventsService: EventsService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
  ){}

  ngOnInit()
  {
    this.authService.currentUser.subscribe(curUser => {
      this.currentUser = curUser;
    })

    this.allowEdit = this.route.snapshot.queryParams["allowEdit"];
    this.idParam = this.route.snapshot.params["id"]
    if(this.idParam)
    {
      this.eventsService.getEvent(this.idParam).subscribe((event: Event) => {
        this.editableEvent = event;
      });

    }
  }

  onEditFormInitialized(event: FormGroup)
  {
    setTimeout(()=>
    {
      this.detailsForm = event
    })
  }
  onImageFormInitialized(event: FormGroup)
  {
    setTimeout(()=>
    {
      this.imageForm = event
    })
  }
  onTicketingFormInitialized(event: FormGroup)
  {
    setTimeout(()=>
    {
      this.ticketingForm = event
    })
  }

  changeImageUrl(event)
  {
    this.fileUrl = event;
  }
  
  markAsTouch(group: FormGroup | FormArray)
  {
    Object.keys(group.controls).forEach(field => {
      const control = group.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAsTouch(control);
      }
    });
    if(group.value?.type) // if the ticket has a type (we are now in the summary page)
    {
      let image = null
      const reader = new FileReader()
      this.isLoading =true;
      reader.onload = e => 
      {
        console.log(this.detailsForm.value, this.imageForm.value, this.ticketingForm.value)
        image = reader.result;
        this.isLoading =false;
        this.summary = {
          title: this.detailsForm.value.details.title,
          category: this.detailsForm.value.details.category,
          location: this.detailsForm.value.details.location,
          hoisting: this.currentUser.name,
          startDate: new Date(this.detailsForm.value.date.startDate),
          startTime: this.detailsForm.value.date.startTime,
          endTime: this.detailsForm.value.date.endTime,
          description: this.detailsForm.value.description,
          // imageFile: this.imageForm.value.file,
          imageFile: image,
          type: this.ticketingForm.value.type,
          tickets: this.ticketingForm.value.type === "Ticketed Event" ? this.ticketingForm.value.tickets : [],
        }
        
      }
      reader.readAsDataURL(this.imageForm.value.file)
    }
  }

  onSubmit()
  {
    if(this.allowEdit)
    {
      this.eventsService.updateEvent(this.idParam, this.summary)
      .subscribe(
        response => {
          console.log(response)
        },
        error => {
          this.router.navigate(["/home"])
        }
      )
    }
    else this.eventsService.addEvent(this.summary);
  }

  forbiddenValue(control: FormControl)
  {
    if(control.value === "default") return {"forbiddenValue": true}
    else return null;
  }
  forbiddenTime(control: FormControl)
  {
    if(control.value === "13:00") return {"forbiddenTime": true}
    else return null;
  }
}
