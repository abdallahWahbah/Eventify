import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
// import { User } from "./user.model";
import { Router } from "@angular/router";

interface AuthResponseData
{
    idToken: string;
    email: string;	
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}

export interface User
{
    email: string;
    password: string;
    name: string;
    isAdmin?: boolean
}


@Injectable({providedIn: "root"})
export class AuthService
{

    currentUser = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient){}

    signup(user: User)
    {
        return this.http.post<any>(
            "/api/signup", 
            {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        )
    }  

    login(email: string, password: string)
    {
        return this.http.post<any>(
            "/api/login", 
            {
                email: email,
                password: password,
            }
        )
    }

    getUserFromLocalStorage()
    {
        const curUser = JSON.parse(localStorage.getItem("currentUser"))
        this.currentUser.next(curUser);
    }
}