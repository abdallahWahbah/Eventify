import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { NgModule } from "@angular/core";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: "auth", loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule) },
    { path: "home", loadChildren: () => import("./pages/home/home.module").then(x => x.HomeModule)},
    { path: "events", loadChildren: () => import("./pages/events/events.module").then(x => x.EventsModule) },
    { path: "add-cat", loadChildren: () => import('./pages/add-cat/add-cat.module').then(x => x.AddCatModule) },
    { path: "about", component: AboutComponent},
    { path: "contact", component: ContactComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}