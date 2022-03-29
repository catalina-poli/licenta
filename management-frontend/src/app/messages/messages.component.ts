import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Mesaj } from '../model/mesaj';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Mesaj[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.findMyMessages()
      .subscribe(
        rez => {
          this.messages = rez;
          console.log('messages: ', this.messages);
        },
        err => {
          console.log('err: ', err);
        }
      );
  }

  deleteMessage(m: Mesaj){
    this.messageService.deleteMessage(m)
      .subscribe(
        rez => {
          console.log('deleted message: ', rez);
          this.messages.splice(this.messages.indexOf(m), 1);
        },
        err => {
          console.log('err: ', err);
        }
      );
  }

}
