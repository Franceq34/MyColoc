import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Invitation } from '../../../shared/models/invitation.model';
import { User } from '../../../shared/models/user.model';
import { InvitationService } from '../../../shared/services/invitation.service';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['../profile-manager.component.css']
})
export class AddMemberModalComponent implements OnInit {

  public addMemberForm: FormGroup;
  public error: string;
  public success: string;

  constructor(
    private fb: FormBuilder,
    private invitationService: InvitationService
  ) { }

  ngOnInit() {
    this.addMemberForm = this.fb.group({
      emailUser: ['', [Validators.required, Validators.email]]
    });
  }

  public sendInvitation():void{
    let userInvited = new User(
      null,
      null,
      null,
      this.addMemberForm.value.emailUser
    );
    this.invitationService.sendInvitation(userInvited).subscribe( (res) => {
      this.error = null;
      this.success = res;
    }, err => {
      this.success = null;
      this.error = err.error;
    });
    
  }
}
