export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public address?: {
      street: string;
      city: string;
      zipcode: string;
    }
  ) {}
}
