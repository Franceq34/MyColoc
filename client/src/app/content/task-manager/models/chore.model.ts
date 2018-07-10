import { Accomplished } from "./accomplished";

export class Chore {
  constructor(
    public idChore: number,
    public nameChore: string,
    public firstnameLastUser? : string,
    public nicknameLastUser? : string,
    public dateLastAccomplished? : number,
    public historyAccomplished? : Accomplished[]
  ) {}
}
