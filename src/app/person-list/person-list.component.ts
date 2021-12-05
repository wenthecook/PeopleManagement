import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';

import { People } from '../models/People';
import { IPeopleRepository } from '../models/IPeopleRepository';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  peopleList: Array<People>;
  peopleRepository: IPeopleRepository;
  columnsToDisplay = [
    'First Name',
    'Last Name',
    'Email',
    'Date of Birth',
    'Edit'
  ];


  constructor(
    private personService: PersonService
  ) {
    this.peopleRepository = this.personService.peopleRepository;
    this.peopleList = this.personService.peopleRepository.peopleList;
  }

  ngOnInit(): void {
  }

  editPeople(people: People): void {
    let i = this.peopleRepository.findIndex(people);
    console.log(i);
  }

}
