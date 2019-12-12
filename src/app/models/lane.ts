import {Card} from './card';

export class Lane {
  constructor(
    public title: string,
    public cards: [Card]
  ) {
  }
}
