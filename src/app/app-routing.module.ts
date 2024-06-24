import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./pages/home/home.component";
import { EventsComponent } from "./pages/events/events.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { AuthGuard } from "./auth/auth-guard.service";
import { StepperComponent } from "./stepper/stepper.component";
import { SummaryComponent } from "./common/summary/summary.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: "auth", component: AuthComponent },
    { path: "home", component: HomeComponent},
    { path: "events/new", component: StepperComponent, canActivate: [AuthGuard]},
    { path: "events/:modifier", component: EventsComponent},
    { path: "events/details/:id", component: SummaryComponent},
    { path: "events/edit/:id", component: StepperComponent, canActivate: [AuthGuard]},
    { path: "about", component: AboutComponent},
    { path: "contact", component: ContactComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}