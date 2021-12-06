import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonService } from '../person.service';

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
  ) {
    this.title = this.personService.addMode ? "Add a person" : "Save changes";
    this.content = this.personService.addMode
    ? "This person will be added: "
    : "The information has been changed to: ";
  }

  ngOnInit(): void {
  }

  verify(): boolean {
    return true;
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
