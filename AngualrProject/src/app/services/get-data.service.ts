import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private _http:HttpClient) { }

  getAlbums() : Observable<Object> {
    let albums = new Array();
    
    return Observable.create((observer: Subscriber<Object>) => {

      this._http.get<any>('http://127.0.0.1:8000/album/',{})
      .subscribe(
        data => { // succes de l’observable httpClient
          albums = data;
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(albums); // renvoi des données pour l’observable principal
      });
    });
  }

  getDetails(id : number) : Observable<any> {
    let details = new Array();
    
    return Observable.create((observer: Subscriber<any>) => {
      let url = 'http://127.0.0.1:8000/album/' + id;
      this._http.get<any>(url,{})
      .subscribe(
        data => { // succes de l’observable httpClient
          details = data;
          //console.log("serice 1 ",details);
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(details); // renvoi des données pour l’observable principal
      });
    });
  }

  getAlbum(id : number) : Observable<any> {
    let album = new Array();
    
    return Observable.create((observer: Subscriber<any>) => {
      let url = 'http://127.0.0.1:8000/getAlbum/' + id;
      this._http.get<any>(url,{})
      .subscribe(
        data => { // succes de l’observable httpClient
          album = data;
          console.log("Album---> ",album);
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(album); // renvoi des données pour l’observable principal
      });
    });
  }

  getPanier(id : number) : Observable<any> {
    let panier = new Array();
    
    return Observable.create((observer: Subscriber<any>) => {
      let url = 'http://127.0.0.1:8000/panier/' + id;
      this._http.get<any>(url,{})
      .subscribe(
        data => { // succes de l’observable httpClient
          panier = data;
          console.log("Panier---> ",data);
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(panier); // renvoi des données pour l’observable principal
      });
    });
  }
}
