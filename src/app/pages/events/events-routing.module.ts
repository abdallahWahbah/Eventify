import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StepperComponent } from "../../stepper/stepper.component";
import { AuthGuard } from "../../auth/auth-guard.service";
import { EventsComponent } from "./events.component";
import { SummaryComponent } from "../../common/summary/summary.component";

const eventsRoutes: Routes = [
    { 
        path: "",
        children: [
            { path: "new", component: StepperComponent, canActivate: [AuthGuard] },
            { path: ":modifier", component: EventsComponent },
            { path: "details/:id", component: SummaryComponent},
            { path: "edit/:id", component: StepperComponent, canActivate: [AuthGuard]},
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(eventsRoutes)],
    exports: [RouterModule]
})
export class EventsRoutingModule
{

}