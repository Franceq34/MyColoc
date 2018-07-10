import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-update-email-modal',
  templateUrl: './update-email-modal.component.html',
  styleUrls: ['./update-email-modal.component.css']
})
export class UpdateEmailModalComponent implements OnInit {

  @Output()
  private updated = new EventEmitter();
  @Input()
  currentUser: User;
  public userEmailForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userEmailForm = this.fb.group({
      emailUser: ['', [Validators.minLength(2)]]
   });
  }

  ngOnInit() {
  }

  updateEmailUser(){
    const updatedUser = this.currentUser;
    if(this.userEmailForm.value.emailUser)
      updatedUser.emailUser = this.userEmailForm.value.emailUser;
    this.userService.updateCurrentUser(updatedUser).subscribe( ( res ) => {
      this.updated.emit();
    });
  }

}