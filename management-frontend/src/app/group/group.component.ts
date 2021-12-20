import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: any[] = [];
  students: any[] = [];
  selectedGroup : any = null;
  selectedStudent: any = null;
  constructor(private groupService : GroupService, private usersService : UserService) { }

  users: any[] = []; // TODO: students, nu users
  ngOnInit(): void {
    this.groupService.findAllGroups()
      .subscribe(
        gr => {
          this.groups = gr;
          console.log('Groups: ', this.groups);
        }
      );
    this.usersService.findAllUsers().subscribe(
      users => {
        this.users = users;
        console.log('users: ', this.users);
      }
    );
  }

  viewStudents(group: any){
    this.students = group['students'];
    this.selectedGroup = group;
  }
  removeUserFromGroups(student: any){
    this.groupService.removeUserFromGroup(student['id'], this.selectedGroup['id'])
      .subscribe(datele => {
        console.log('removed user: ', student, ' from group: ', this.selectedGroup);
        this.selectedGroup = datele;
        this.students = this.students.filter(x => x != student);
      });
  }
  addUserToGroup(){
    console.log('adding student: ', this.selectedStudent, ' to group: ', this.selectedGroup);
    this.groupService.addUserToGroup(this.selectedStudent['id'], this.selectedGroup['id'])
    .subscribe(datele => {
      console.log('removed user: ', this.selectedStudent, ' from group: ', this.selectedGroup);
      this.selectedGroup = datele;
      this.students.push(this.selectedStudent)
    });
  }

}
