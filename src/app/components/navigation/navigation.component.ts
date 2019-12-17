import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentUser: User;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(user);
      console.log(this.currentUser);
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedInNavigation;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
