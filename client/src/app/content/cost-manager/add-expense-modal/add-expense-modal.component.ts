import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';
import { User } from '../../../shared/models/user.model';
import { ColocService } from '../../../shared/services/coloc.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.css']
})
export class AddExpenseModalComponent implements OnInit {

  @Output()
  private added = new EventEmitter();
  public expenseForm: FormGroup;
  public currentMembersColoc: User[];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private colocService: ColocService
  ) {
    let sub = this.colocService.getMembersColoc().subscribe( (members) => {
      this.currentMembersColoc = members;
      const controls = this.currentMembersColoc.map(c => new FormControl(true));
      this.expenseForm = this.fb.group({
        titleExpense: ['', [Validators.maxLength(100)]],
        amountExpense: ['', [Validators.required, Validators.min(0), Validators.max(100000)]],
        dateExpense: Date.now(),
        authorExpense: ['', [Validators.required, Validators.maxLength(100)]],
        membersConcerned: new FormArray(controls)
     });
    });
    }

  ngOnInit() { }
  
  addExpense():void{
    const selectedMembers = this.expenseForm.value.membersConcerned
      .map((v, i) => v ? this.currentMembersColoc[i].idUser : null)
      .filter(v => v !== null);
    let newExp = new Expense(
      null,
      this.expenseForm.value.titleExpense,
      this.expenseForm.value.amountExpense,
      Date.now(),
      this.expenseForm.value.authorExpense,
      null,
      selectedMembers
    );
    console.log(newExp);
    // this.expenseService.addExpense(newExp).subscribe( ( res ) => {
    //   this.added.emit();
    // });
  }

}
