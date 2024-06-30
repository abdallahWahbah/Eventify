import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AddCatComponent } from "./add-cat.component";
import { SharedModule } from "../../shared.module";
import { AuthGuard } from "../../auth/auth-guard.service";

@NgModule({
    declarations: [
        AddCatComponent,
    ],
    imports: [
        RouterModule.forChild([
            { path: "", component: AddCatComponent, canActivate: [AuthGuard] }
        ]),
        FormsModule,
        CommonModule,
        SharedModule,
    ],
    exports: [RouterModule],
})
export class AddCatModule{}