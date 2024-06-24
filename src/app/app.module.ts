import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; 
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LogoComponent } from './common/logo/logo.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { EventsComponent } from './pages/events/events.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { StepperComponent } from './stepper/stepper.component';
import { EditComponent } from './stepper/edit/edit.component';
import { FooterComponent } from './common/footer/footer.component';
import { BannerComponent } from './stepper/banner/banner.component';
import { TicketingComponent } from './stepper/ticketing/ticketing.component';
import { HeaderComponent } from './common/header/header.component';
import { SummaryComponent } from './common/summary/summary.component';
import { DialogComponent } from './common/summary/dialog/dialog.component';
import { HoverDirective } from './directives/hover.directive';
import { DateCustomPipe } from './pipes/date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    AuthComponent,
    HomeComponent,
    SpinnerComponent,
    HeaderComponent,
    EventsComponent,
    AboutComponent,
    ContactComponent,
    StepperComponent,
    EditComponent,
    FooterComponent,
    BannerComponent,
    TicketingComponent,
    SummaryComponent,
    DialogComponent,
    HoverDirective,
    DateCustomPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
