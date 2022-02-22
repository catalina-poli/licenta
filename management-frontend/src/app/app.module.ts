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
    CereriFlowMyComponent
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
    MatTabsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
