import { Injectable } from '@angular/core';
import { IPeopleRepository } from './models/IPeopleRepository';
import { mockPeopleRepository } from './models/mockPeopleRepository';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  debug: boolean = true;

  readonly peopleRepository: IPeopleRepository;

  private _indexOfPersonUnderChange: number = -1;
  public get indexOfPersonUnderChange(): number {
    return this._indexOfPersonUnderChange;
  }
  public set indexOfPersonUnderChange(id: number) {
    this._indexOfPersonUnderChange = id;
  }

  addMode: boolean = false;

  constructor() {
    this.peopleRepository = new mockPeopleRepository();
  }

}
