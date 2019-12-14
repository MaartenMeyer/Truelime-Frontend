import {Lane} from './lane';
import {User} from './user';

export class Board {
  constructor(
    public id: string,
    public owner: User,
    public title: string,
    public description: string,
    public participants: [string],
    public lanes: [Lane]
  ) {
  }
}
