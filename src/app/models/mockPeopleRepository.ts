import { People } from "./People";
import { IPeopleRepository } from "./IPeopleRepository";

export class mockPeopleRepository implements IPeopleRepository {
  private _peopleList: Array<People>;
  public get peopleList(): Array<People> {
    return this._peopleList;
  }

  private _length: number;
  public get length(): number {
    return this._length;
  }

  constructor() {
    this._peopleList = [
      new People("John", "Doe", new Date(1991, 1, 11), "000", "john@gmail.com"),
      new People("Anne", "James", new Date(1992, 2, 22), "001", "anne@outlook.com"),
      new People("Jack", "Martin", new Date(1992, 10, 22), "001", "anne@outlook.com"),
    ];
    this._length = this._peopleList.length;
  }

  addPeople(people: People): number {
    this._peopleList.push(people);
    this._length = this._peopleList.length;
    return this._length;
  }

  clear(): boolean {
    this._peopleList = [];
    this._length = this._peopleList.length;
    return true;
  }

  getPeopleList() {
    return this.peopleList;
  }

  getPeople(id: number): People{
    return this._peopleList[id];
  }

  changePeople(id: number, newPeople: People): boolean {
    if (!this._peopleList[id]) {
      return false;
    }

    this._peopleList[id] = newPeople;
    return true;
  }

  findIndex(people: People): number {
    for (let i = 0; i < this.peopleList.length; i++) {
      let p = this.getPeople(i);
      if (
        p &&
        p.FirstName === people.FirstName &&
        p.LastName === people.LastName &&
        p.Email === people.Email &&
        p.DateOfBirth.getDate() === people.DateOfBirth.getDate() &&
        p.DateOfBirth.getMonth() === people.DateOfBirth.getMonth() &&
        p.DateOfBirth.getFullYear() === people.DateOfBirth.getFullYear() &&
        p.TelephoneNumber === people.TelephoneNumber
        ) {
          return i;
        }
    }
    return -1;
  }
}
