import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExpenseService {
  public expenses: BehaviorSubject<Expense[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
  ) {
    this.readAllExpenses();
  }

  public addExpense(expense: Expense):Observable<Expense>{
    return this.http.post<any>('/api/expenses/addExpense', expense);
  }

  public readAllExpenses():Observable<Expense[]> {
    return this.http.get<Expense[]>('/api/expenses/getAllExpenses');
  }

  public readExpense(id:number):Observable<Expense> {
    return this.http.get<Expense>('/api/expenses/read/' + id);
  }

  public deleteExpense(id:number):Observable<any> {
    return this.http.delete<any>('/api/expenses/' + id);
  }

  public getChartData():Observable<any>{
    return this.http.get<any>('/api/expenses/getChartData');
  }

}
