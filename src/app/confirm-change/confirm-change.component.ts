import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonService } from '../person.service';
import { PeopleFormService } from '../people-form.service';

import { People } from '../models/People';

@Component({
  selector: 'app-confirm-change',
  templateUrl: './confirm-change.component.html',
  styleUrls: ['./confirm-change.component.css']
})
export class ConfirmChangeComponent implements OnInit {

  title: string;
  content: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public people: People,
    private router: Router,
    private personService: PersonService,
    private peopleFormService: PeopleFormService,
  ) {
    this.title = this.personService.addMode ? "Add a person" : "Save changes";
    this.content = this.personService.addMode
    ? "This person will be added: "
    : "The information has been changed to: ";
  }

  ngOnInit(): void {
  }

  verify(): boolean {
    let result = true;
    if (this.people.FirstName === "") {
      this.peopleFormService.wrongFirstName = true;
      result = false;
    }
    if (this.people.LastName === "") {
      this.peopleFormService.wrongLastName = true;
      result = false;
    }
    let email = this.people.Email;
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      this.peopleFormService.wrongEmail = true;
      result = false;
    }
    let tel = this.people.TelephoneNumber;
    if(!(/^\d+$/.test(tel))) {
      this.peopleFormService.wrongTelephoneNumber = true;
      result = false;
    }
    return result;
  }

  save() {
    if (!this.verify()) {
      return;
    }
    let newPeople = new People(
      this.people.FirstName,
      this.people.LastName,
      this.people.DateOfBirth,
      this.people.TelephoneNumber,
      this.people.Email
    );
    let changeResult: any;
    if (!this.personService.addMode) {
      changeResult = this.personService.peopleRepository.changePeople(this.personService.indexOfPersonUnderChange, newPeople);
    } else {
      changeResult = this.personService.peopleRepository.addPeople(newPeople);
    }
    if (this.personService.debug) {
      console.warn(newPeople);
    }
    if (changeResult) {
      this.personService.addMode = false;
      this.personService.indexOfPersonUnderChange = -1;
      this.router.navigateByUrl('person-list');
      return;
    }
  }

}
