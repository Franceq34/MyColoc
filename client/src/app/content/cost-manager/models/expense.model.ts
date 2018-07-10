import { User } from "../../../shared/models/user.model";

export class Expense {
  constructor(
    public idExpense: number,
    public titleExpense: string,
    public amountExpense: number,
    public dateExpense: number,
    public authorExpense: number,
    public firstnameUser?: number,
    public nicknameUser?: number,
    public membersConcerned?: User[]
  ) {}
}
