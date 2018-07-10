import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { Expense } from './models/expense.model';
import { ExpenseService } from './services/expense.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { ColocService } from '../../shared/services/coloc.service';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-cost-manager',
  templateUrl: './cost-manager.component.html',
  styleUrls: ['./cost-manager.component.css'],
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
export class CostManagerComponent implements OnInit, OnDestroy {
  public currentState: string ='shown';
  private alive: boolean = true;
  public showChart: Boolean;
  public currentUser: Observable<User>;
  public membersColoc: User[];

  public currentExpense: Expense;
  public expenseOpening: number = -1;
  public expenseExpanded: number = -1;
  public expensePortion: number = 0;

  public expenses: Expense[];
  constructor(
    private expenseService: ExpenseService,
    private colocService: ColocService,
    private userService: UserService
  ) {}


  ngOnInit() {
    this.showChart = false;
    this.loadExpenses();
    this.currentUser = this.userService.getCurrentUser();
  }

  initHorizontalBarChart(chartData:any):void {
    //Initialisation des labels
    let labels = [];
    this.membersColoc.forEach(function(element) {
      labels.push(element.firstnameUser);
    });

    //Initialisation dataset et couleurs
    let dataset = [];
    let backgroundColor = [];
    this.membersColoc.forEach(function(member) {
      let sumExpensesConcerned = 0; //somme des dépenses qui concernent le membre
      let sumExpensesPayed = 0; //somme des dépenses du membre
      chartData.amountsConcerned.forEach(function(amountConcernedUser){
        if(amountConcernedUser.idUser == member.idUser){
          sumExpensesConcerned = amountConcernedUser.amount;
        }
      });
      chartData.amountsPayed.forEach(function(amountPayedUser){
        if(amountPayedUser.idUser == member.idUser){
          sumExpensesPayed = amountPayedUser.amount;
        }
      });
      let data = sumExpensesPayed - sumExpensesConcerned;
      data = (Math.round(data * 100) / 100);
      dataset.push(data);
      if(data>0){
        backgroundColor.push("#5cb860");
      } else {
        backgroundColor.push("#c25975");
      }
    });



    var barChart = new Chart(document.getElementById("horizontalBalance"), {
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Balance",
            backgroundColor: backgroundColor,
            data: dataset
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Balance des dépenses'
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
            }
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true
            }
          }]
        }
      }
  });
  }

  deleteExpense(id:number):void{
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.loadExpenses();
    });
  }

  public readExpense(id:number) {
    this.expenseOpening = id;
    this.currentExpense = null;
    this.expensePortion = null;
    this.expenseService.readExpense(id).subscribe( expense => {
      if(this.expenseOpening == id){
        this.expenseOpening = -1;
      }
      this.currentExpense = expense;
      this.expensePortion = Math.ceil((expense.amountExpense/expense.membersConcerned.length)*100)/100;
    });
  }

  public expandExpense(id:number){
    this.readExpense(id); 
    this.expenseExpanded = id;
  }

  public loadExpenses() {
    this.expenseService.readAllExpenses()
    .takeWhile(() => this.alive)
    .subscribe( expenses => {
      this.expenses = expenses;
      this.colocService.getMembersColoc()
      .takeWhile(() => this.alive)
      .subscribe( (members) => {
        this.membersColoc = members;
        if(expenses && expenses.length>0){
          this.expenseService.getChartData()
          .takeWhile(() => this.alive)
          .subscribe( (chartData) => {
            this.initHorizontalBarChart(chartData);
            this.showChart = true;
          });
        } else {
          this.showChart = false;
        }
      });
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
