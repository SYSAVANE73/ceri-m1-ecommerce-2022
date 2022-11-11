import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber , BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  

  //dataSource = new BehaviorSubject<Array<any>>([]);
  private dataSource: BehaviorSubject<string> = new BehaviorSubject<string>('bonjour');
  data: Observable<string> = this.dataSource.asObservable();
  //dataPlot = this.dataSource.asObservable();

  //send_data = new Subject<any>();

  constructor() { }
  
  test = new Array();

  updatedata(data: string) {
    
    //this.approvalStageMessage.next(data);
    this.dataSource.next(data);
    console.log("service ---> ",this.dataSource);
  }
}
