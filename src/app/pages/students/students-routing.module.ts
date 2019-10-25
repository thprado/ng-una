import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsListComponent } from './students-list/students-list.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent
  },
  {
    path: 'new',
    component: StudentsFormComponent
  },
  {
    path: ':id/edit',
    component: StudentsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
