import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared.module";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: "", component: AuthComponent },
        ]),
        FormsModule,
        CommonModule,
        SharedModule,
    ],
    exports: [RouterModule]
})
export class AuthModule{}