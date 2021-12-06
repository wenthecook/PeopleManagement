import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
@Component({
  selector: 'app-confirm-discard',
  templateUrl: './confirm-discard.component.html',
  styleUrls: ['./confirm-discard.component.css']
})
export class ConfirmDiscardComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDiscardComponent>,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    this.router.navigateByUrl('person-list');
  }

}
