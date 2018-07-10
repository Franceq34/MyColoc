import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/models/user.model';
import { ColocService } from '../../shared/services/coloc.service';
import { Coloc } from '../../shared/models/coloc.model';
import { Invitation } from '../../shared/models/invitation.model';
import { InvitationService } from '../../shared/services/invitation.service';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.css'],
  animations: [
    trigger('content', [
      transition(':enter', [
        style({
          opacity: '0',
          transform: 'translateY(30px)'
        }),
        animate('300ms ease-out')
      ]),
    ])
  ]
})
export class ProfileManagerComponent implements OnInit {
  public currentState: string ='shown';
  public currentUser: User; 
  public currentColoc: Coloc;
  public currentMembersColoc: User[];
  public currentInvitations: Invitation[];
  public hasInvitation: Boolean;

  constructor(
    private userService: UserService,
    private colocService: ColocService,
    private invitationService: InvitationService
  ) {}

  ngOnInit() {
    this.hasInvitation = false;
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      if(user.idColoc){
        this.loadColoc();
        this.loadMembersColoc();
      } else {
        this.loadInvitations();
      }
    });
  }

  public acceptInvitation(inv: Invitation){
    let updatedUser = this.currentUser;
    updatedUser.idColoc = inv.idColoc;
    this.userService.updateCurrentUser(updatedUser).subscribe( () => {
      this.invitationService.deleteInvitations().subscribe( () => {
        this.loadUser();
        this.loadColoc();
        this.loadMembersColoc();
        this.loadInvitations();
      });
    })
  }

  public declineInvitation(inv: Invitation){
    this.invitationService.declineInvitation(inv.idColoc).subscribe( () => {
      this.loadUser();
      this.loadColoc();
      this.loadMembersColoc();
      this.loadInvitations();
    });
  }

  public leaveColoc(){
    // Get the user to update
    let updateUser;
      updateUser = this.currentUser;
      updateUser.idColoc = null;
      this.userService.updateCurrentUser(updateUser).subscribe( (user) => {
        this.loadUser();
        this.currentColoc = null;
        this.currentMembersColoc = null;
        this.loadInvitations();
      });
  }

  public loadUser(){
    let sub = this.userService.getCurrentUser().subscribe( (user) => {
      this.currentUser = user;
    });
  }

  public loadColoc(){
    let sub = this.colocService.getCurrentColoc().subscribe( (coloc) => {
      this.currentColoc = coloc;
    });
  }

  public loadMembersColoc(){
    let sub = this.colocService.getMembersColoc().subscribe( (members) => {
      this.currentMembersColoc = members;
    });
  }

  public loadInvitations(){
    let sub = this.invitationService.readAll().subscribe( (invitations) => {
      this.currentInvitations = invitations;
      if(invitations.length > 0){
        this.hasInvitation = true;
      } else {
        this.hasInvitation = false;
      }
    });
  }

}
