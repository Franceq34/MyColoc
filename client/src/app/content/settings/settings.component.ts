import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
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
export class SettingsComponent implements OnInit {

  public currentState: string ='shown';

  constructor() { }

  ngOnInit() {}
}
