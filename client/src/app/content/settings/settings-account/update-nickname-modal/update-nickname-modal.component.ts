import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-update-nickname-modal',
  templateUrl: './update-nickname-modal.component.html',
  styleUrls: ['./update-nickname-modal.component.css']
})
export class UpdateNicknameModalComponent implements OnInit {

  @Output()
  private updated = new EventEmitter();
  @Input() currentUser: User;
  public userNicknameForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userNicknameForm = this.fb.group({
      nicknameUser: ['', [Validators.minLength(2), Validators.maxLength(32)]]
   });
  }

  ngOnInit() {
  }

  updateNicknameUser(){
    const updatedUser = this.currentUser;
    if(this.userNicknameForm.value.nicknameUser)
      updatedUser.nicknameUser = this.userNicknameForm.value.nicknameUser;
    this.userService.updateCurrentUser(updatedUser).subscribe( ( res ) => {
      this.updated.emit();
    });
  }

}
