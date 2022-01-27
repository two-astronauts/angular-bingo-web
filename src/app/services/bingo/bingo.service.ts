import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BingoService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public table$: BehaviorSubject<string> = new BehaviorSubject('');
  public name$: BehaviorSubject<string> = new BehaviorSubject('');
  public number$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  socket = io(environment.server);

  public sendMessage(message: String) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  public getTable = () => {
    this.socket.on('table', (message) =>{
      this.table$.next(message);
    });

    return this.table$.asObservable();
  };

  public sendName(message: String) {
    this.socket.emit('name', message);
  }

  public getNames = () => {
    this.socket.on('name', (message) =>{
      this.name$.next(message);
    });

    return this.name$.asObservable();
  };

  public getNumbers = () => {
    this.socket.on('number', (message) =>{
      this.number$.next(message);
    });

    return this.number$.asObservable();
  };

  public sendWin(message: String) {
    this.socket.emit('win', message);
  }

}
