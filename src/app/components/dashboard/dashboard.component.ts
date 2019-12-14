import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
  }

}
