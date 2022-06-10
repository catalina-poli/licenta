import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AnunturiComponent } from './anunturi/anunturi.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UseriComponent } from './useri/useri.component';
import { CereriComponent } from './cereri/cereri.component';
import { AnunturiStudentComponent } from './anunturi-student/anunturi-student.component';
import { AnunturiStudentViewComponent } from './anunturi-student-view/anunturi-student-view.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmareComponent } from './confirmare/confirmare.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AddAnuntComponent } from './add-anunt/add-anunt.component';
import { AddCerereComponent } from './add-cerere/add-cerere.component';
import { CereriFlowComponent } from './cereri-flow/cereri-flow.component';
import { CereriFlowViewComponent } from './cereri-flow-view/cereri-flow-view.component';
import { GroupComponent } from './group/group.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CereriFlowMyComponent } from './cereri-flow-my/cereri-flow-my.component';
import { CereriFlowMyStatusDialogComponent } from './cereri-flow-my-status-dialog/cereri-flow-my-status-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MessagesComponent } from './messages/messages.component';
import { AddCerereFormsComponent } from './add-cerere-forms/add-cerere-forms.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SabloaneComponent } from './sabloane/sabloane.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AddAnuntDocumentComponent } from './add-anunt-document/add-anunt-document.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogTableFlowItemsComponent } from './cereri-flow-my/dialog-table-flow-items/dialog-table-flow-items.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { TableDetailedComponent } from './add-cerere-forms/table-detailed/table-detailed.component';
import { CereriFlowViewDialogComponent } from './cereri-flow-view-dialog/cereri-flow-view-dialog.component';
import { DatePipe } from '@angular/common';
import { ViewStudentsDialogComponent } from './group/view-students-dialog/view-students-dialog.component';
import { EditAnuntDialogComponent } from './anunturi-student-view/edit-anunt-dialog/edit-anunt-dialog.component';
import { CustomFlowComponent } from './custom-flow/custom-flow.component';
import { ViewUsersDialogComponent } from './custom-flow/view-users-dialog/view-users-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    AnunturiComponent,
    UseriComponent,
    CereriComponent,
    AnunturiStudentComponent,
    AnunturiStudentViewComponent,
    LoginComponent,
    ConfirmareComponent,
    AddAnuntComponent,
    AddCerereComponent,
    CereriFlowComponent,
    CereriFlowViewComponent,
    GroupComponent,
    CereriFlowMyComponent,
    CereriFlowMyStatusDialogComponent,
    MessagesComponent,
    AddCerereFormsComponent,
    SabloaneComponent,
    AddAnuntDocumentComponent,
    ProfileInformationComponent,
    DialogTableFlowItemsComponent,
    LoginRegisterComponent,
    TableDetailedComponent,
    CereriFlowViewDialogComponent,
    ViewStudentsDialogComponent,
    EditAnuntDialogComponent,
    CustomFlowComponent,
    ViewUsersDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    PdfViewerModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    OverlayModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTreeModule,
    MatStepperModule,
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
