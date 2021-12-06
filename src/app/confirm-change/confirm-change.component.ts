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

  constructor(
    public dialogRef: MatDialogRef<ConfirmChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public people: People,
    private router: Router,
    private personService: PersonService,
  ) { }

  ngOnInit(): void {
  }

  save() {
    let newPeople = new People(
      this.people.FirstName,
      this.people.LastName,
      this.people.DateOfBirth,
      this.people.TelephoneNumber,
      this.people.Email
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
