import {Card} from './card';

export class Lane {
  constructor(
    public _id: string,
    public title: string,
    public cards: [Card]
  ) {
  }
}
