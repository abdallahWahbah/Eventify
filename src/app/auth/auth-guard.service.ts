import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate
{   
    constructor(private authService: AuthService,
                private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        return this.authService.currentUser.pipe(
            take(1),
            map(user => {
                const isAuthenticated = !!user && user.isAdmin;
                if(isAuthenticated) return true;
                else return this.router.createUrlTree(['/home'])
            })
        )
    }
}