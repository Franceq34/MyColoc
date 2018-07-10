export class Task {
  constructor(
    public idTask: number,
    public nameTask: string,
    public isArchivedTask: Boolean,
    public dateTask: number,
    public authorTask ?: number,
    public firstnameAuthorTask ?: string,
    public nicknameAuthorTask ?: string
  ) {}
}
