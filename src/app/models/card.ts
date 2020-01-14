import {User} from './user';

export class Card {
  constructor(
    public id: string,
    public author: User,
    // public title: string,
    public message: string,
    public type: string,
    public rating: number,
    public color: string
  ) {
  }
}
