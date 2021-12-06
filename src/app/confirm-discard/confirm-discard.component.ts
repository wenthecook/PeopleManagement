import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { PersonService } from '../person.service';
@Component({
  selector: 'app-confirm-discard',
  templateUrl: './confirm-discard.component.html',
  styleUrls: ['./confirm-discard.component.css']
})
export class ConfirmDiscardComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDiscardComponent>,
    private router: Router,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    this.personService.addMode = false;
    this.personService.indexOfPersonUnderChange = -1;
    this.router.navigateByUrl('person-list');
  }

}
