import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCerereFormsComponent } from './add-cerere-forms/add-cerere-forms.component';
import { AnunturiStudentViewComponent } from './anunturi-student-view/anunturi-student-view.component';
import { AnunturiStudentComponent } from './anunturi-student/anunturi-student.component';
import { AnunturiComponent } from './anunturi/anunturi.component';
import { CereriFlowMyComponent } from './cereri-flow-my/cereri-flow-my.component';
import { CereriFlowViewComponent } from './cereri-flow-view/cereri-flow-view.component';
import { CereriFlowComponent } from './cereri-flow/cereri-flow.component';
import { CereriComponent } from './cereri/cereri.component';
import { CustomFlowComponent } from './custom-flow/custom-flow.component';
import { EsArchievedComponent } from './es-archieved/es-archieved.component';
import { GroupComponent } from './group/group.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { SabloaneComponent } from './sabloane/sabloane.component';
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
    path: 'cerere-flow/:id/:type',
    component: CereriFlowComponent
  },{
    path: 'cereri-flow-view/:id',
    component: CereriFlowViewComponent
  },
  {
    path: 'groups',
    component: GroupComponent
  },
  {
    path: 'my-flow-items',
    component: CereriFlowMyComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'cerere-forms',
    component: AddCerereFormsComponent
  },
  {
    path: 'sabloane',
    component: SabloaneComponent
  },
  {
    path: 'profile',
    component: ProfileInformationComponent
  },
  {
    path: 'login-register',
    component: LoginRegisterComponent
  },
  {
    path: 'my-custom-flows',
    component: CustomFlowComponent
  },
  {
    path: "archieved",
    component:EsArchievedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
