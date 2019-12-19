import {Card} from './card';

export class Lane {
  constructor(
    public id: string,
    public title: string,
    public cards: Card[]
  ) {
  }
}
