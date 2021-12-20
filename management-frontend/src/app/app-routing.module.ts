import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnunturiStudentViewComponent } from './anunturi-student-view/anunturi-student-view.component';
import { AnunturiStudentComponent } from './anunturi-student/anunturi-student.component';
import { AnunturiComponent } from './anunturi/anunturi.component';
import { CereriFlowViewComponent } from './cereri-flow-view/cereri-flow-view.component';
import { CereriFlowComponent } from './cereri-flow/cereri-flow.component';
import { CereriComponent } from './cereri/cereri.component';
import { LoginComponent } from './login/login.component';
import { UseriComponent } from './useri/useri.component';

const routes: Routes = [
  {
    path: 'utilizatorii',
    component: UseriComponent
  },
  {
    path: 'anunturile',
    component: AnunturiComponent
  },
  {
    path: 'cererile',
    component: CereriComponent
  }, {
    path: 'antunturi-student',
    component: AnunturiStudentComponent
  }, {
    path: 'anunturi-student/:id_anunt',
    component: AnunturiStudentViewComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cerere-flow/:id',
    component: CereriFlowComponent
  },{
    path: 'cereri-flow-view/:id',
    component: CereriFlowViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
