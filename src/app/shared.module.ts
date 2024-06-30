import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

import { FooterComponent } from "./common/footer/footer.component";
import { HeaderComponent } from "./common/header/header.component";
import { HoverDirective } from "./directives/hover.directive";
import { LogoComponent } from "./common/logo/logo.component";
import { EventsService } from "./pages/events/events.service";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { SpinnerComponent } from "./common/spinner/spinner.component";

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        HoverDirective,
        LogoComponent,
        AboutComponent,
        ContactComponent,
        SpinnerComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatIconModule,
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        HoverDirective,
        RouterModule,
        LogoComponent,
        AboutComponent,
        ContactComponent,
        SpinnerComponent,
        MatIconModule,
    ],
    providers: [
        EventsService,
    ]
})
export class SharedModule{}