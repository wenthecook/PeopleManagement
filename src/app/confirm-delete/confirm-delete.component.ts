import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonService } from '../person.service';

import { People } from '../models/People';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public people: People,
    private router: Router,
    private personService: PersonService,
  ) { }

  ngOnInit(): void {
  }

  delete(people: People) {
    let i = this.personService.peopleRepository.findIndex(people);
    console.log(i);
    if (i !== -1) {
      this.personService.peopleRepository.deletePeople(i);
    }
    this.router.navigateByUrl('person-list');
  }

}
