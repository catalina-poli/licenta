import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from 'src/app/group.service';
import { UserService } from 'src/app/user.service';



export interface DialogData {
  id: number;
  message: string;
  rezultat: any;
  flowItem: any;
  status: boolean;
  students: any[];
}

@Component({
  selector: 'app-view-students-dialog',
  templateUrl: './view-students-dialog.component.html',
  styleUrls: ['./view-students-dialog.component.css']
})
export class ViewStudentsDialogComponent implements OnInit {

  students: any[] = [];
  selectedStudent: any = null;
  users: any[] = []; // TODO: students, nu users
  

  constructor(
    private usersService : UserService,
    private groupService : GroupService, 
    public dialogRef: MatDialogRef<ViewStudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    console.log('dialog data: ', this.data);
    this.students = this.data['students'];
    this.usersService.findAllUsers().subscribe(
      users => {
        this.users = users;
        console.log('users: ', this.users);
      }
    );
  }


  onNoClick(): void {
    console.log('NO CLICK HAS BEEN CLICKED');
    this.dialogRef.close();
  }



  removeUserFromGroups(student: any){
    this.groupService.removeUserFromGroup(student['id'], this.data.id)
      .subscribe(datele => {
        console.log('removed user: ', student, ' from group: ', this.data);
        this.data = datele;
        this.students = this.students.filter(x => x != student);
      });
  }
  addUserToGroup(){
    console.log('adding student: ', this.selectedStudent, ' to group: ', this.data);
    this.groupService.addUserToGroup(this.selectedStudent['id'], this.data['id'])
    .subscribe(datele => {
      console.log('removed user: ', this.selectedStudent, ' from group: ', this.data);
      this.data = datele;
      this.students.push(this.selectedStudent)
    });
  }

}
