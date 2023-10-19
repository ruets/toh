import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    let currentDate = new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    this.messages.push(currentDate + ': ' + message);
  }

  clear() {
    this.messages = [];
  }
}
