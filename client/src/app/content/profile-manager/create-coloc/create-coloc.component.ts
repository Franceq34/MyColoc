import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColocService } from '../../../shared/services/coloc.service';
import { Coloc } from '../../../shared/models/coloc.model';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-create-coloc',
  templateUrl: './create-coloc.component.html',
  styleUrls: ['./create-coloc.component.css']
})
export class CreateColocComponent implements OnInit {
  
  public currentUser: User;
  @Output()
  create = new EventEmitter();

  public colocForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private colocService: ColocService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.colocForm = this.fb.group({
      nameColoc: ['']
   });
  }

  public createColoc():void{
    let newColoc = new Coloc(
      null,
      this.colocForm.value.nameColoc
    );

    this.colocService.addColoc(newColoc).subscribe( () => {
      this.create.next();
      let sub = this.userService.getCurrentUser().subscribe( (user) => {
        this.currentUser = user;
      });
    });
  }

}
