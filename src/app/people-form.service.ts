import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleFormService {

  wrongFirstName: boolean = false;
  wrongLastName: boolean = false;
  wrongEmail: boolean = false;
  wrongTelephoneNumber: boolean = false;

  constructor() { }

  clear() {
    this.wrongFirstName = false;
    this.wrongLastName = false;
    this.wrongEmail = false;
    this.wrongTelephoneNumber = false;
  }
}
