import { NgModule } from "@angular/core";
import { StepperComponent } from "../../stepper/stepper.component";
import { EventsComponent } from "./events.component";
import { SummaryComponent } from "../../common/summary/summary.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";

import { EventsRoutingModule } from "./events-routing.module";
import { SharedModule } from "../../shared.module";
import { DateCustomPipe } from "../../pipes/date.pipe";
import { EditComponent } from "../../stepper/edit/edit.component";
import { BannerComponent } from "../../stepper/banner/banner.component";
import { TicketingComponent } from "../../stepper/ticketing/ticketing.component";
import { DialogComponent } from "../../common/summary/dialog/dialog.component";

@NgModule({
    declarations: [
        StepperComponent,
        EventsComponent,
        SummaryComponent,
        EditComponent,
        BannerComponent,
        TicketingComponent,
        DialogComponent,
        DateCustomPipe,
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        EventsRoutingModule,
        SharedModule,
        MatStepperModule,
        MatButtonModule,
    ],
})
export class EventsModule
{

}