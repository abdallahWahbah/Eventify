import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class UtilService 
{
  monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  eventLocations: {value: string, label: string}[] = 
  [
    {value: "default", label: "Select the location"}, 
    {value: "egy", label:"Egypt"}, 
    {value: "jordan", label:"Jordan"}, 
    {value: "ksa", label:"Saudi Arabia"}, 
    {value: "lebanon", label:"Lebanon"}, 
    {value: "uae", label:"United Arab Emirated"}, 
  ]
  
  eventCategories: {value: string, label: string, icon: string}[] = 
  [
    {value: "default", label: "Select the event category", icon: ""}, 
    {value: "entertainment", label:"Entertainment", icon: "assets/categories/entertainment.png"}, 
    {value: "education", label:"Educational & Business", icon: "assets/categories/education.png"}, 
    {value: "culture", label:"Cultural & Arts", icon: "assets/categories/culture.png"}, 
    {value: "sports", label:"Sports & Fitness", icon: "assets/categories/sports.png"}, 
    {value: "tech", label:"Technology & Innovation", icon: "assets/categories/technology.png"}, 
    {value: "travel", label:"Travel & Adventure", icon: "assets/categories/travel.png"}, 
  ];

  getCategory(value: string)
  {
    return this.eventCategories.find(e => e.value === value).label
  }
  getLocation(location: string)
  {
    return this.eventLocations.find(loc => loc.value === location).label
  }
  getMonth(date: Date)
  {
    return this.monthNames[date.getMonth()];
  }
  getDay(date: Date)
  {
    return date.getDate()
  }
  getTime(time: any)
  {
    let [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`
  }
  getTicketPrice(tickets: any)
  {
    let sum = 0;
    for(let i = 0; i < tickets.length; i++)
    {
      sum += tickets[i].price
    }
    return sum;
  }

}
