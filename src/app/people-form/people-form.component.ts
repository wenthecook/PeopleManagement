import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmChangeComponent } from '../confirm-change/confirm-change.component';
import { ConfirmDiscardComponent } from '../confirm-discard/confirm-discard.component';
import { PersonService } from '../person.service';
import { PeopleFormService } from '../people-form.service';

import { People } from '../models/People';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent implements OnInit {

  profileForm: FormGroup;
  wrongFirstName: boolean = false;
  wrongLastName: boolean = false;
  wrongEmail: boolean = false;
  wrongTelephoneNumber: boolean = false;

  constructor(
    private personService: PersonService,
    private router: Router,
    public dialog: MatDialog,
    private peopleFormService: PeopleFormService
  ) {
    if (this.personService.indexOfPersonUnderChange !== -1) {
      let person = this.personService.peopleRepository.getPeople(this.personService.indexOfPersonUnderChange);
      this.profileForm= new FormGroup({
        firstName: new FormControl(person.FirstName),
        lastName: new FormControl(person.LastName),
        email: new FormControl(person.Email),
        telephoneNumber: new FormControl(person.TelephoneNumber),
        dateOfBirth: new FormControl(person.DateOfBirth),
      });
    } else if(this.personService.addMode){
      this.profileForm = new FormGroup({
        firstName: new FormControl(""),
        lastName: new FormControl(""),
        email: new FormControl(""),
        telephoneNumber: new FormControl(""),
        dateOfBirth: new FormControl(new Date()),
      });
    } else {
      this.profileForm = new FormGroup({});
      this.router.navigateByUrl('person-list');
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let formValue = this.profileForm.value;
    console.log(formValue);
    let newPeople = new People(
      formValue.firstName,
      formValue.lastName,
      formValue.dateOfBirth,
      formValue.telephoneNumber,
      formValue.email
    );
    let dialogRef = this.dialog.open(ConfirmChangeComponent, {
      width: '350px',
      data: newPeople,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.wrongFirstName = this.peopleFormService.wrongFirstName;
      this.wrongLastName = this.peopleFormService.wrongLastName;
      this.wrongEmail = this.peopleFormService.wrongEmail;
      this.wrongTelephoneNumber = this.peopleFormService.wrongTelephoneNumber;
      this.peopleFormService.clear();
    });
  }

  verifyFirstName() {
    this.wrongFirstName = false;
    let formValue = this.profileForm.value;
    if (formValue.firstName === '') {
      this.wrongFirstName = true;
    }
  }

  verifyLastName() {
    this.wrongLastName = false;
    let formValue = this.profileForm.value;
    if (formValue.lastName === '') {
      this.wrongLastName = true;
    }
  }

  verifyEmail() {
    this.wrongEmail = false;
    let formValue = this.profileForm.value;
    let email = formValue.email;
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      this.wrongEmail = true;
    }
  }

  verifyTelephoneNumber() {
    this.wrongTelephoneNumber = false;
    let formValue = this.profileForm.value;
    let tel = formValue.telephoneNumber;
    if(!(/^\d+$/.test(tel))) {
      this.wrongTelephoneNumber = true;
    }
  }



  discardChange() {
    this.dialog.open(ConfirmDiscardComponent, {
      width: '350px',
    });
  }

}
