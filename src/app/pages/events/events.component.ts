import { Component, OnInit } from '@angular/core';
import { Event, EventsService } from './events.service';
import { UtilService } from '../../common/util.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit{

  events: Event[];
  isLoading = true;
  eventCategories: {value: string, label: string, icon: string}[] = []
  eventLocations: {value: string, label: string}[] = []

  constructor(private eventsService: EventsService,
              private router: Router,
              private route: ActivatedRoute,
              private utilService: UtilService
  ){}

  ngOnInit() 
  {
    this.eventsService.getAllCategories().subscribe((cats: {value: string, label: string, icon: string}[]) => {
      this.eventCategories = cats.filter(cat => cat.value !== "default")
    })
    this.eventsService.getAllEvents().subscribe((allEvents: Event[]) => {

      this.isLoading = false;
      if(allEvents.length === 0) return;

      // this.eventCategories = this.utilService.eventCategories.filter(cat => cat.value !== "default")
      this.eventLocations = this.utilService.eventLocations.filter(location => location.value !== "default")

      const routeModifier = this.route.snapshot.params["modifier"]
      if(routeModifier === "all")
      {
        this.events = allEvents;
      }
      else if(routeModifier === "category")
      {
        const queryParam = this.route.snapshot.queryParams["cat"];
        this.events = allEvents.filter(event => event.category === queryParam);
      }
      else if(routeModifier === "search")
      {
        const queryParam = this.route.snapshot.queryParams["location"];
        this.events = allEvents.filter(event => event.location === queryParam);
      }
    })
  }

  sortEvents(event: HTMLSelectElement)
  {
    console.log(typeof new Date(this.events[0].startDate))
    console.log(this.events)
    if(event.value === "desc")
    {
      this.events.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
      })
    }
    else
    {
      this.events.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateA - dateB;
      })
    }
  }
  getCategory(event: Event)
  {
    return this.utilService.getCategory(event.category);
  }
  getTime(time: any)
  {
    return this.utilService.getTime(time)
  }
  getMonth(date: Date)
  {
    return this.utilService.getMonth(new Date(date))
  }
  getDay(date: Date)
  {
    return this.utilService.getDay(new Date(date))
  }
  getLocation(location: string)
  {
    return this.utilService.getLocation(location)
  }
  getTicketPrice(tickets: any)
  {
    return this.utilService.getTicketPrice(tickets)
  }
  navigateToSummary(event: any)
  {
    console.log(event)
    this.router.navigate(['/events', 'details', event._id])
  }
}
