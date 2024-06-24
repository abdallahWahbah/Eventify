import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "customDate"
})
export class DateCustomPipe implements PipeTransform
{
    monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    transform(value: Date, shape: string) 
    {
        value = new Date(value)
        console.log(value)
        let day = this.days[value.getDay()]; // wednesday
        let month = this.monthNames[value.getMonth()]; // june
        let year = value.getFullYear() // 2024
        switch(shape)
        {
            case "short":
            {
                return `${day.slice(0, 3)}, ${value.getMonth() + 1}, ${year}`
            }
            case "fullDate":
            {
                    return `${day}, ${month}, ${year}`;
            }
        }
        return ""
    }
}