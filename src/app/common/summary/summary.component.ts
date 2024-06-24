import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import { AuthService, User } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../pages/events/events.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit{
  @Input() summary: any;
  idParam: string;
  currentUser: User;
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  eventLocations: {value: string, label: string}[];
  showDialog = false;
  @Input() allowEdit;

  constructor(private utilService: UtilService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private eventsService: EventsService
  ){}

  ngOnInit() 
  {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user
    })

    this.eventLocations = this.utilService.eventLocations;

    this.idParam = this.route.snapshot.params["id"];
    if(this.idParam && !this.allowEdit)
    {
      this.eventsService.getEvent(this.idParam).subscribe(event => {
        this.summary = event;
      })
    }
  }

  getTime(time: any)
  {
    return this.utilService.getTime(time)
  }
  getTicketPrice(tickets: any)
  {
    return this.utilService.getTicketPrice(tickets);
  }
  getLocation(key: string)
  {
    return this.eventLocations.find(location => location.value === key).label
  }
  getImage(image: any)
  {
    console.log(image)
  }
  handleShowDialog(event)
  {
    this.showDialog = event;
  }
  navigateToEdit(id: string)
  {
    this.router.navigate(['/events', 'edit', id], {queryParams: {"allowEdit": true}})
  }
}
