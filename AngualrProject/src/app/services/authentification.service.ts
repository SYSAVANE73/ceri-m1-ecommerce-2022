import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private _http:HttpClient) {}

  estConnecter = false;

  UserConnexion(login : string, pwd : string) : Observable<any> {
    var userConnect  = new Array(); //declaration de la collection pour recuperer les infos de l'utilisateur connecté
    
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/login/' + login + "/" + pwd;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/login/' + login + "/" + pwd;
      
      //console.log(url);
      this._http.get<any>(url,{})
      .subscribe(
        data => { // succes de l’observable httpClient
          userConnect = data; //on recupere de la collection renvoyé par le serveur
          this.estConnecter = true;
          //console.log("service ",data)
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      this.estConnecter = false;
      },
      () => {// terminaison de l’observable httpClient
        observer.next(userConnect); // renvoi des données pour l’observable principal
      });
    });  
  }

  UserInscription(nom : string, prenom : string,login : string, pwd : string) : Observable<any> {

    var msg = "";
    var statut = "user";
    
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/signin/' + nom + "_" + prenom+ "_" + login+ "_" + pwd + "_" + statut;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/signin/' + nom + "_" + prenom+ "_" + login+ "_" + pwd + "_" + statut;
      //console.log(url);
      this._http.get<any>(url,{})
      .subscribe(
        data => { // succes de l’observable httpClient
          msg = data;
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(msg); // renvoi des données pour l’observable principal
      });
    });  
  }
  //Mise à jour des informations de l'utilisateur
  updateUserInfo(old_login : string, nom : string, prenom : string, new_login : string) : Observable<any> {
    var msg = "";
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/updateUser/' + old_login + "/" + nom+ "/" + prenom+ "/" + new_login;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/updateUser/' + nom + "/" + prenom+ "/" + old_login+ "/" + new_login;
      //console.log(url);
      this._http.get<any>(url,{})
      .subscribe(
        data => { // succes de l’observable httpClient
          msg = data;
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(msg); // renvoi des données pour l’observable principal
      });
    });  
  }
}
