import { Component, OnInit } from '@angular/core';
import { Chore } from '../models/chore.model';
import { ChoreService } from '../services/chore.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Accomplished } from '../models/accomplished';

@Component({
  selector: 'app-task-repeatable',
  templateUrl: './task-repeatable.component.html',
  styleUrls: ['./task-repeatable.component.css']
})
export class TaskRepeatableComponent implements OnInit {

  public currentTime: number = Date.now();
  public chores: Chore[];
  public choreForm: FormGroup;
   
  constructor(private fb: FormBuilder, private choreService: ChoreService) { }

  ngOnInit() {
    this.loadChores();

    this.choreForm = this.fb.group({
       nameChore: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  public loadChores() {
    let sub = this.choreService.readAllChores().subscribe( chores => {
      this.chores = chores;
    });
  }
  
  createChore():void{
    let newChore = new Chore(
      null,
      this.choreForm.value.nameChore
    );

    this.choreService.addChore(newChore).subscribe( () => {
      this.loadChores();
    });

    
  }

  checkChore(id : number):void{
    const acc = new Accomplished(id, Date.now());
    let sub = this.choreService.checkChore(acc).subscribe( () => {
      this.loadChores();
    });
  }

  daysCount(oldDate:number):number{
    return Math.ceil((Date.now() - oldDate) / 1000*60*60*24);
  }

}
