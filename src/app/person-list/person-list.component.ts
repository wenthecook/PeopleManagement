import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { People } from '../models/People';
import { IPeopleRepository } from '../models/IPeopleRepository';

import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  peopleRepository: IPeopleRepository;
  columnsToDisplay = [
    'First Name',
    'Last Name',
    'Email',
    'Date of Birth',
    'Edit',
    'Delete'
  ];

  peopleList: MatTableDataSource<People>;

  constructor(
    private personService: PersonService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.peopleRepository = this.personService.peopleRepository;
    this.peopleList  = new MatTableDataSource(this.personService.peopleRepository.peopleList);
  }

  ngOnInit(): void {
  }

  editPeople(people: People): void {
    let i = this.peopleRepository.findIndex(people);
    this.personService.indexOfPersonUnderChange = i;
    this.router.navigateByUrl('person-form');
  }

  addPeople(): void {
    this.personService.addMode = true;
    this.router.navigateByUrl('person-form');
  }

  deletePeople(people: People): void {
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '350px',
      data: people,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.peopleList  = new MatTableDataSource(this.personService.peopleRepository.peopleList);
    });

  }

}
