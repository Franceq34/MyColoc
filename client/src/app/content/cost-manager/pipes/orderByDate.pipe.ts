import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../models/expense.model';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  transform(allExpenses: Expense[]): Expense[] {
    return allExpenses.sort(this.compare);
  }

  compare(a:Expense, b:Expense):number {
  if (a.dateExpense < b.dateExpense)
    return 1;
  if (a.dateExpense > b.dateExpense)
    return -1;
  return 0;
}
}
