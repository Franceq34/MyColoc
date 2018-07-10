import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css'],
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
export class TaskManagerComponent implements OnInit {
  public currentState: string ='shown';
  constructor() { }

 
  ngOnInit() {}
}
