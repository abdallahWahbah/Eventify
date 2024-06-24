import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface Event
{   
    id: string;
    title: string;
    location: string;
    category: string;
    hoisting: string;
    startDate: Date;
    startTime: string;
    endTime?: string;
    description: string;
    imageFile: string;
    type: string;
    tickets?: {name: string, price: number}[];
}

@Injectable({providedIn: "root"})
export class EventsService
{
    constructor(private http: HttpClient,
                private router: Router
    ){}

    getAllEvents()
    {
        return this.http.get("/api/events")
    }

    addEvent(event: Event)
    {
        this.http.post(
            "/api/events/new", 
            {
                title: event.title,
                location: event.location,
                category: event.category,
                hoisting: event.hoisting,
                startDate: event.startDate,
                startTime: event.startTime,
                endTime: event.endTime,
                description: event.description,
                imageFile: event.imageFile,
                type: event.type,
                tickets: event.tickets,
            }
        )
        .subscribe(
            response => {
                this.router.navigate(["/home"])
            },
            error => {
                if(error.status === 200) this.router.navigate(["/home"])
            }
        )
        
    }

    getEvent(id: string)
    {
        return this.http.get("/api/events/" + id)
    }

    updateEvent(id: string, event: Event)
    {
        return this.http.patch(
            "/api/events/update/" + id,
            {
                title: event.title,
                location: event.location,
                category: event.category,
                hoisting: event.hoisting,
                startDate: event.startDate,
                startTime: event.startTime,
                endTime: event.endTime,
                description: event.description,
                imageFile: event.imageFile,
                type: event.type,
                tickets: event.tickets
            }
        )
    }
}


    // events: Event[] =
    // [
    //     {
    //         id: "20240701",
    //         title: "Music Concert",
    //         category: "entertainment",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-07-01'),
    //         startTime: "18:00",
    //         endTime: "22:00",
    //         description: "An exciting evening of live music.",
    //         imageFile: "assets/events/entertainment.avif",
    //         type: "Ticketed Event",
    //         tickets: [
    //             { name: "General Admission", price: 50 },
    //             { name: "VIP", price: 100 }
    //         ],
    //         location: "egy"
    //     },
    //     {
    //         id: "20240710",
    //         title: "Art Exhibition",
    //         category: "culture",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-07-10'),
    //         startTime: "10:00",
    //         endTime: "17:00",
    //         description: "Explore the latest in modern art.",
    //         imageFile: "assets/events/culture.avif",
    //         type: "Free Event",
    //         location: "jordan"
    //     },
    //     {
    //         id: "20240815",
    //         title: "Tech Conference",
    //         category: "tech",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-08-15'),
    //         startTime: "09:00",
    //         endTime: "17:00",
    //         description: "A day of insightful talks and networking.",
    //         imageFile: "assets/events/tech.avif",
    //         type: "Ticketed Event",
    //         tickets: [
    //             { name: "Early Bird", price: 75 },
    //             { name: "Standard", price: 100 }
    //         ],
    //         location: "ksa"
    //     },
    //     {
    //         id: "20240720",
    //         title: "Community Picnic",
    //         category: "travel",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-07-20'),
    //         startTime: "11:00",
    //         endTime: "15:00",
    //         description: "A fun day out for the whole family.",
    //         imageFile: "assets/events/travel.avif",
    //         type: "Free Event",
    //         location: "lebanon"
    //     },
    //     {
    //         id: "20240905",
    //         title: "Film Festival",
    //         category: "entertainment",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-09-05'),
    //         startTime: "14:00",
    //         endTime: "23:00",
    //         description: "Screenings of the latest independent films.",
    //         imageFile: "assets/events/entertainment.avif",
    //         type: "Ticketed Event",
    //         tickets: [
    //             { name: "Day Pass", price: 40 },
    //             { name: "Festival Pass", price: 120 }
    //         ],
    //         location: "uae"
    //     },
    //     {
    //         id: "20240725",
    //         title: "Business Workshop",
    //         category: "education",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-07-25'),
    //         startTime: "09:00",
    //         endTime: "17:00",
    //         description: "A workshop on the latest business strategies.",
    //         imageFile: "assets/events/education.avif",
    //         type: "Ticketed Event",
    //         tickets: [
    //             { name: "General Admission", price: 80 },
    //             { name: "VIP", price: 150 }
    //         ],
    //         location: "egy"
    //     },
    //     {
    //         id: "20240801",
    //         title: "Yoga Retreat",
    //         category: "sports",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-08-01'),
    //         startTime: "07:00",
    //         endTime: "15:00",
    //         description: "A day of relaxation and fitness with yoga.",
    //         imageFile: "assets/events/sports.avif",
    //         type: "Free Event",
    //         location: "jordan"
    //     },
    //     {
    //         id: "20240910",
    //         title: "Coding Bootcamp",
    //         category: "tech",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-09-10'),
    //         startTime: "09:00",
    //         endTime: "17:00",
    //         description: "Intensive coding bootcamp for all levels.",
    //         imageFile: "assets/events/tech.avif",
    //         type: "Ticketed Event",
    //         tickets: [
    //             { name: "Standard", price: 200 },
    //             { name: "VIP", price: 350 }
    //         ],
    //         location: "ksa"
    //     },
    //     {
    //         id: "20240825",
    //         title: "Wine Tasting Tour",
    //         category: "travel",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-08-25'),
    //         startTime: "12:00",
    //         endTime: "18:00",
    //         description: "Tour and taste the best wines in the region.",
    //         imageFile: "assets/events/travel.avif",
    //         type: "Ticketed Event",
    //         tickets: [
    //             { name: "Standard", price: 60 },
    //             { name: "Premium", price: 100 }
    //         ],
    //         location: "lebanon"
    //     },
    //     {
    //         id: "20240730",
    //         title: "Classical Music Night",
    //         category: "culture",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-07-30'),
    //         startTime: "19:00",
    //         endTime: "22:00",
    //         description: "An evening of classical music performances.",
    //         imageFile: "assets/events/culture.avif",
    //         type: "Ticketed Event",
    //         tickets: [
    //             { name: "General Admission", price: 45 },
    //             { name: "VIP", price: 85 }
    //         ],
    //         location: "uae"
    //     },
    //     {
    //         id: "20240805",
    //         title: "Business Networking Event",
    //         category: "education",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-08-05'),
    //         startTime: "18:00",
    //         endTime: "21:00",
    //         description: "Meet and connect with local business leaders.",
    //         imageFile: "assets/events/education.avif",
    //         type: "Ticketed Event",
    //         tickets: [
    //             { name: "General Admission", price: 30 },
    //             { name: "VIP", price: 70 }
    //         ],
    //         location: "egy"
    //     },
    //     {
    //         id: "20240820",
    //         title: "Marathon",
    //         category: "sports",
    //         hoisting: "Abdalla",
    //         startDate: new Date('2024-08-20'),
    //         startTime: "06:00",
    //         endTime: "12:00",
    //         description: "Run the annual city marathon.",
    //         imageFile: "assets/events/sports.avif",
    //         type: "Free Event",
    //         location: "jordan"
    //     }
    // ];
