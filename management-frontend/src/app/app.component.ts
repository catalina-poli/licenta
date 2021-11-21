import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor() {
    console.log('AppComponent - CONSTRUCTOR')
  }

  ngOnInit(): void {
    console.log('AppComponent - ngOnInits')
  }
  title = 'management-frontend';
}
