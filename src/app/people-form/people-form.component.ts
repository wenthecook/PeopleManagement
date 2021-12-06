import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { PersonService } from '../person.service';

import { People } from '../models/People';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    private personService: PersonService,
    private router: Router
  ) {
    if (this.personService.indexOfPersonUnderChange === -1) {
      this.router.navigateByUrl('person-list');
    }
    let person = this.personService.peopleRepository.getPeople(this.personService.indexOfPersonUnderChange);
    this.profileForm= new FormGroup({
      firstName: new FormControl(person.FirstName),
      lastName: new FormControl(person.LastName),
      email: new FormControl(person.Email),
      telephoneNumber: new FormControl(person.TelephoneNumber),
      dateOfBirth: new FormControl(person.DateOfBirth),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let formValue = this.profileForm.value;
    let newPeople = new People(
      formValue.firstName,
      formValue.lastName,
      formValue.dateOfBirth,
      formValue.telephoneNumber,
      formValue.email
    );
    let changeResult = this.personService.peopleRepository.changePeople(this.personService.indexOfPersonUnderChange, newPeople);
    if (this.personService.debug) {
      console.warn(newPeople);
    }
    if (changeResult) {
      this.router.navigateByUrl('person-list');
      return;
    }
  }

}
