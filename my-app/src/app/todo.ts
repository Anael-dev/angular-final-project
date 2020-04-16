export class Todo {
  constructor(
    public userId: number,
    public title: string,
    public completed: boolean,
    public id?: number
  ) {}
}
