import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrls: ['./settings-account.component.css']
})
export class SettingsAccountComponent implements OnInit {
  
  public currentUser: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(){
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

}
