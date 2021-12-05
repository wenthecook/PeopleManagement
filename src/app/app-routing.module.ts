import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleFormComponent } from './people-form/people-form.component';
import { PersonListComponent } from './person-list/person-list.component';

const routes: Routes = [
  { path: '', redirectTo: "person-list", pathMatch: "full"},
  { path: 'person-list', component: PersonListComponent },
  { path: 'person-form', component: PeopleFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
