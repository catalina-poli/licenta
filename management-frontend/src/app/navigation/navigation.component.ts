import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { MessageService } from '../message.service';
import { Mesaj } from '../model/mesaj';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @ViewChild(MatSidenav) drawer: any;
  numberOfNotifications: number = 0;
  notifications: Mesaj[] = [];


  messagesAssociated(){
    console.log('messages!');
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private messageService: MessageService) {
    console.log('navigation component loaded')
  }

  refreshNumberOfMessages(){
    this.messageService.findMyMessages()
    .subscribe(
      messages => {
        this.numberOfNotifications = messages.length;
        this.notifications = messages;
      },
      err =>{
        console.log('err', err);
      }
    );
  }

  ngOnInit(): void {
    // TODO: update the number of notifications when a new notification is added
    this.refreshNumberOfMessages();
    // TODO: uncomment!!!!!!!
    // setInterval(() =>{
    //   this.refreshNumberOfMessages();
    // }, 5000);

  }

  logout() {
    localStorage.removeItem('CHEIE_OAUTH');
    localStorage.removeItem('MY_DETAILS');
    this.router.navigate(['/login']);
  }

  canSee(navigationItem: string) {
    if (!localStorage.getItem('CHEIE_OAUTH')) {
      // not logged in
      return false;
    }
    if (navigationItem == 'utilizatori') {
      return this.userService.canISee(['ADMIN'])
    }
    if (navigationItem == 'anunturi') {
      return this.userService.canISee(['ADMIN', 'PROFESOR', 'COMANDANT', 'SECRETAR'])
    }
    if (navigationItem == 'anunturi-student') {
      return this.userService.canISee(['STUDENT']);
    }
    if (navigationItem == 'cereri') {
      return this.userService.canISee(['STUDENT', 'COMANDANT', 'PROFESOR', 'SECRETAR', 'ADMIN']);
    }
    if (navigationItem == 'grupuri') {
      return this.userService.canISee(['ADMIN']);
    }
    if (navigationItem == 'decizii') {
      return this.userService.canISee(['ADMIN', 'PROFESOR', 'COMANDANT']);
    }
    return false;
  }


  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  } 
  
  isOpen = false;

  


}
