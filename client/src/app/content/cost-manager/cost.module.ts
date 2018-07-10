import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import { CommonModule } from '@angular/common';
import { CostManagerComponent } from './cost-manager.component';
import { AddExpenseModalComponent } from './add-expense-modal/add-expense-modal.component';
import { ExpenseService } from './services/expense.service';

import { OrderByDatePipe } from './pipes/orderByDate.pipe';

import { CostRoutingModule } from './cost-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeFR);

@NgModule({
  imports: [
    CommonModule,
    CostRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CostManagerComponent,
    AddExpenseModalComponent,
    OrderByDatePipe
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    ExpenseService
  ]
})
export class CostModule { }
