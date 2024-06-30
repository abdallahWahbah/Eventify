import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { SharedModule } from "../../shared.module";

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        RouterModule.forChild([
            { path: "", component: HomeComponent}
        ]),
        SharedModule,
        CommonModule,
    ],
    exports: [RouterModule]
})
export class HomeModule{}