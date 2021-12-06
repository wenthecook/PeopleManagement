import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmChangeComponent } from '../confirm-change/confirm-change.component';
import { ConfirmDiscardComponent } from '../confirm-discard/confirm-discard.component';
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
    private router: Router,
    public dialog: MatDialog
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
    this.dialog.open(ConfirmChangeComponent, {
      width: '350px',
      data: newPeople,
    });
  }

  discardChange() {
    this.dialog.open(ConfirmDiscardComponent, {
      width: '350px',
    });
  }

}
