import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { OwnColocDirective } from './directives/own-coloc.directive';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.css']
})
export class NavLinksComponent implements OnInit {
  @Input()
  public ownColoc : boolean;
  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((user : User) => {
      if (user) {
        if (user.idColoc) {
          this.ownColoc = true;
        } else  {
          this.ownColoc = false;
        }
      }
    });
  }


}
