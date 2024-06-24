import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../../common/util.service';
import { ActivatedRoute } from '@angular/router';
import { Event, EventsService } from '../../pages/events/events.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit{
  @Output() formInitialized = new EventEmitter<FormGroup>();
  @Input() detailsForm: FormGroup;
  @Input() editableEvent: Event;

  eventCategories: {value: string, label: string, icon: string}[] = []

  eventLocations: {value: string, label: string}[] = []

  constructor(private utilService: UtilService,
              private route: ActivatedRoute,
              private eventsService: EventsService
  ){}

  ngOnInit()
  {
    this.eventCategories = this.utilService.eventCategories
    this.eventLocations = this.utilService.eventLocations

    
    this.detailsForm = new FormGroup({
      details: new FormGroup({
        title: new FormControl(this.editableEvent?.title || null, [Validators.required]),
        category: new FormControl(null, [Validators.required, this.forbiddenValue.bind(this)]),
        location: new FormControl(null, [Validators.required, this.forbiddenValue.bind(this)]),
      }),
      date: new FormGroup({
        startDate: new FormControl(this.editableEvent?.startDate ? this.formatDate(this.editableEvent?.startDate) : null, [Validators.required]),
        startTime: new FormControl(this.editableEvent?.startTime || "13:00", [Validators.required, this.forbiddenTime.bind(this)]),
        endTime: new FormControl(this.editableEvent?.endTime || "13:00")
      }),
      description: new FormControl(this.editableEvent?.description || null, [Validators.required])
    }) 
    this.detailsForm.controls['details'].get("category").setValue(this.editableEvent?.category || 'default'); // added cause I couldn't initilize default value
    this.detailsForm.controls['details'].get("location").setValue(this.editableEvent?.location || 'default'); // added cause I couldn't initilize default value
  
    this.formInitialized.emit(this.detailsForm);
    
  }

  formatDate(date: Date)
  {
    date = new Date(date)
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
