import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GroupService } from '../group.service';
import { UserService } from '../user.service';
import { ViewStudentsDialogComponent } from './view-students-dialog/view-students-dialog.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: any[] = [];
  selectedGroup : any = null;
  

 

  constructor(private groupService : GroupService, 
   
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.groupService.findAllGroups()
      .subscribe(
        gr => {
          this.groups = gr;
          console.log('Groups: ', this.groups);
        }
      );
  
  }

  // viewStudents(group: any){
  //   this.hasClickedViewGroup = true;
  //   this.students = group['students'];
  //   this.selectedGroup = group;
  // }
 


  viewStudentsDialog(group: any){
    
    // this.students = group['students'];
    this.selectedGroup = group;
    this.openDialog(group);
  }
  openDialog(group: any): Observable<any> {

    const dialogRef = this.dialog.open(ViewStudentsDialogComponent, {
      width: '100%',
      data: group
    });

    return dialogRef.afterClosed();
  }


}
