import { Injectable } from '@angular/core';
import { IPeopleRepository } from './models/IPeopleRepository';
import { mockPeopleRepository } from './models/mockPeopleRepository';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  readonly peopleRepository: IPeopleRepository;

  constructor() {
    this.peopleRepository = new mockPeopleRepository();
  }

}
