import { Injectable } from '@angular/core';
import { Observable, throwError, Subscriber } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket : any;
  readonly uri : string = "http://127.0.0.1:8000/ws";
  constructor() { 
    this.socket = io(this.uri);
  }

  listen(eventname : string) : Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on(eventname, (data:any) => {
        subscribe.next(data);
      })
    })
  }
  /*
  emit(eventname: string, data: any){
    this.socket.emit(eventname, data);
  }
  */
  emit(data: any){
    this.socket.emit(data);
  }
}
