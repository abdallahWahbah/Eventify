import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  currentUser: User;

  constructor(private authService: AuthService){}

  ngOnInit()
  {
    this.authService.currentUser.subscribe(curUser => {
      this.currentUser = curUser;
    })
  }
}
