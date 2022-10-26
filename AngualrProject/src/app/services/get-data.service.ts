import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private _http:HttpClient) { }

  getAlbums() : Observable<Object> {
    let data = new Array();
    return Observable.create((observer: Subscriber<Object>) => {

      this._http.get<any>('http://127.0.0.1:8000/album/',{})
      .subscribe(
        data => { // succes de l’observable httpClient
          data = data;
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(data); // renvoi des données pour l’observable principal
      });
    });
  }
}
