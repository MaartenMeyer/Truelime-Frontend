import {User} from './user';

export class Card {
  constructor(
    public author: User,
    public title: string,
    public message: string,
    public rating: number
  ) {
  }
}
