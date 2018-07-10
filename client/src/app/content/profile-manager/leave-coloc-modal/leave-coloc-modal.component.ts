import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-leave-coloc-modal',
  templateUrl: './leave-coloc-modal.component.html',
  styleUrls: ['../profile-manager.component.css']
})
export class LeaveColocModalComponent implements OnInit {
  
  @Output()
  leave = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
