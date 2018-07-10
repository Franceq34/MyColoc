import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChoreService } from '../../services/chore.service';
import { Observable } from 'rxjs';
import { Chore } from '../../models/chore.model';
import { Chart } from 'chart.js';
import { Accomplished } from '../../models/accomplished';

@Component({
  selector: 'app-task-repeatable-details',
  templateUrl: './task-repeatable-details.component.html',
  styleUrls: ['./task-repeatable-details.component.css']
})
export class TaskRepeatableDetailsComponent implements OnInit {

  private id: number;
  private chore: Chore;
  private showChart = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private choreService: ChoreService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadChore();
    });
  }

  checkChore(id : number):void{
    const acc = new Accomplished(id, Date.now());
    let sub = this.choreService.checkChore(acc).subscribe( () => {
      this.loadChore();
    });
  }

  deleteChore(id : number):void{
    let sub = this.choreService.deleteChore(id).subscribe( () => {
      this.gotoChoresList();
    });
  }

  deleteAccomplished(id : number):void{
    let sub = this.choreService.deleteChoreAccomplished(id).subscribe( () => {
      this.loadChore();
    });
  }

  loadChore(){
    this.choreService.readChore(this.id).subscribe( chore => {
      this.chore = chore;
      if(chore.historyAccomplished.length>0){
        this.choreService.getChartData(this.id).subscribe( data => {
          this.showChart = true;
          this.loadChart(data);
        });
      } else {
        this.showChart = false;
      }
    });
  }

  loadChart(chartData: any){
    let labels = [];
    let data = [];
    chartData.forEach(member => {
      data.push(member.numberAccomplished);
      if(member.nicknameUser){
        labels.push(member.nicknameUser);
      } else {
        labels.push(member.firstnameUser);
      }
    });
    let myChart = new Chart(document.getElementById("doughnutChore"), {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: data
          }
        ]
      },
      options: {
        legend: {
            display: false
        }
    }
  });
  }

  gotoChoresList() {
    this.router.navigate(['/tasks/repeatable']);
  }
}
