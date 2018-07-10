import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-update-name-modal',
  templateUrl: './update-name-modal.component.html',
  styleUrls: ['./update-name-modal.component.css']
})
export class UpdateNameModalComponent implements OnInit {

  @Output()
  private updated = new EventEmitter();
  @Input() currentUser: User;
  public userNameForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userNameForm = this.fb.group({
      firstnameUser: ['', [Validators.minLength(2), Validators.maxLength(32)]],
      lastnameUser: ['', [Validators.minLength(2), Validators.maxLength(32)]],
   });
  }

  ngOnInit() {
  }

  updateNameUser(){
    const updatedUser = this.currentUser;
    if(this.userNameForm.value.firstnameUser)
      updatedUser.firstnameUser = this.userNameForm.value.firstnameUser;
    if(this.userNameForm.value.lastnameUser)
    updatedUser.lastnameUser = this.userNameForm.value.lastnameUser;
    this.userService.updateCurrentUser(updatedUser).subscribe( ( res ) => {
      this.updated.emit();
    });
  }

}
