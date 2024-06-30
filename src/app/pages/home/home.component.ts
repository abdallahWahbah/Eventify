import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../common/util.service';
import { EventsService } from '../events/events.service';
import { Event } from '../events/events.service'
import { AuthService, User } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{

  eventLocations: {value: string, label: string}[] = [];
  eventCategories: {value: string, label: string, icon: string}[] = []
  events: Event[] = [];
  isLoading = true;
  currentUser: User;
  numberOfClicks: number = 0;

  constructor(private eventsService: EventsService,
              private authService: AuthService,
              private router: Router,
              private utilService: UtilService
  ){

    this.eventsService.getAllCategories().subscribe((cats: {value: string, label: string, icon: string}[]) => {
      this.eventCategories = cats.filter(cat => cat.value !== "default")
    })
  
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  
    this.eventsService.getAllEvents().subscribe((allEvents: Event[]) => {
  
      this.isLoading = false;
      if(allEvents.length === 0) return;
  
      this.events = allEvents.slice(0, 6);
      this.eventLocations = this.utilService.eventLocations.filter(location => location.value !== "default")
      // this.eventCategories = this.utilService.eventCategories.filter(cat => cat.value !== "default")
  
    })
  }

  ngOnInit()
  {
  } 

  getCategory(value: string)
  {
    return this.utilService.getCategory(value);
  }

  getMonth(date: Date)
  {
    return this.utilService.getMonth(new Date(date))
  }
  getDay(date: Date)
  {
    return this.utilService.getDay(new Date(date))
  }
  getTime(time: any)
  {
    return this.utilService.getTime(time)
  }
  getTicketPrice(tickets: any)
  {
    return this.utilService.getTicketPrice(tickets)
  }

  navigateToEvents(modifier: string, value: any)
  {
    if(modifier === 'category')
    {
      this.router.navigate(["/events", modifier], {queryParams: {cat: value}})
    }
    else if(modifier === 'search')
    {
      this.router.navigate(['/events', modifier], {queryParams: {location: value.location.value, search: value.search.value}})
    }
    else if(modifier === 'all')
    {
      this.router.navigate(['/events', 'all'])
    }
    else if(modifier === 'new')
    {
      this.router.navigate(['/events', 'new'])
    }
  }
  navigateToSummary(event: any)
  {
    this.router.navigate(['/events', 'details', event._id])
  }

}
