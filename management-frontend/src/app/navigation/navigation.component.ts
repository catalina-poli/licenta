import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router : Router, private userService: UserService) {
    console.log('navigation component loaded')
   }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('CHEIE_OAUTH');
    localStorage.removeItem('MY_DETAILS');
    this.router.navigate(['/login']);
  }

  canSee(navigationItem : string){
    if(!localStorage.getItem('CHEIE_OAUTH')){
      // not logged in
      return false;
    }
    if(navigationItem == 'utilizatori'){
      return this.userService.canISee(['ADMIN'])
    }
    if(navigationItem == 'anunturi'){
      return this.userService.canISee(['ADMIN', 'PROFESOR', 'COMANDANT', 'SECRETAR'])
    }
    if(navigationItem == 'anunturi-student'){
      return this.userService.canISee(['STUDENT']);
    }
    if(navigationItem == 'cereri'){
      return this.userService.canISee(['STUDENT', 'COMANDANT', 'PROFESOR', 'SECRETAR', 'ADMIN']);
    }
    if(navigationItem == 'grupuri'){
      return this.userService.canISee(['ADMIN']);
    }
    if(navigationItem == 'decizii'){
      return this.userService.canISee(['ADMIN', 'PROFESOR', 'COMANDANT']);
    }
    return false;
  }
  

}
