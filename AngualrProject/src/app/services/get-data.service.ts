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
      //let url = 'http://127.0.0.1:8000/album/';
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/album';
      this._http.get<any>(url,{})
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
      //let url = 'http://127.0.0.1:8000/album/' + id;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/album/' + id;
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
      //let url = 'http://127.0.0.1:8000/getAlbum/' + id;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/getAlbum/' + id;
      this._http.get<any>(url,{})
      .subscribe(
        data => { // succes de l’observable httpClient
          album = data;
          //console.log("Album---> ",album);
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(album); // renvoi des données pour l’observable principal
      });
    });
  }

  getArtistes() : Observable<Object> {
    let artistes = new Array();
    
    return Observable.create((observer: Subscriber<Object>) => {
      //let url = 'http://127.0.0.1:8000/';
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/';
      
      this._http.get<any>(url,{})
      .subscribe(
        data => { // succes de l’observable httpClient
          artistes = data;
          //console.log("liste artistes ",data);
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(artistes); // renvoi des données pour l’observable principal
      });
    });
  }

  getPanier(id : number) : Observable<any> {
    let panier = new Array();
    
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/panier/' + id;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/panier/' + id;
      this._http.get<any>(url,{})
      .subscribe(
        data => { // succes de l’observable httpClient
          panier = data;
          //console.log("Panier---> ",data);
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(panier); // renvoi des données pour l’observable principal
      });
    });
  }
  //ajout dans le panier
  insertPanier(id_user : number, id_album : number, montant : number) : Observable<any> {
    var msg = "";
    var quantite = 1;
    
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/insertPanier/' + id_user + "/" + id_album + "/" + montant + "/" + quantite;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/insertPanier/' + id_user + "/" + id_album + "/" + montant + "/" + quantite;
      console.log(url);
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
  //supprimmer un album dans le panier
  deletePanier(id_user : number, id_album : number) : Observable<any> {
    var msg = "";
    
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/supprimer_panier/' + id_user + "_" + id_album;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/supprimer_panier/' + id_user + "_" + id_album;
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
  //recuperation des favoris de l'utilisateur
  getFavoris(id : number) : Observable<any> {
    let favoris = new Array();
    
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/favoris/' + id;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/favoris/' + id;
      this._http.get<any>(url,{})
      .subscribe(
        data => { // succes de l’observable httpClient
          favoris = data;
          //console.log("Favoris---> ",data);
    }, 
    (error) => {// erreur de l’observable httpClient
      console.error('une erreur est survenue!', error);
      },
      () => {// terminaison de l’observable httpClient
        observer.next(favoris); // renvoi des données pour l’observable principal
      });
    });
  }

  //ajout dans le panier
  insertFavoris(id_album : number, id_user : number) : Observable<any> {
    var msg = "";
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/insertFavoris/' + id_album + "/" + id_user;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/insertFavoris/' + id_album + "/" + id_user;
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
  //supprimmer un album dans le panier
  deleteFavoris(id_album : number, id_user : number) : Observable<any> {
    var msg = "";
    
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/supprimer_favoris/' + id_album + "_" + id_user;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/supprimer_favoris/' + id_album + "_" + id_user;
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
  //ajout de l'historique de paiement
  insertHistorique(id_user : number, id_album : string, albums: string, quantite: string, montant: number, date: string ) : Observable<any> {
    var msg = "";
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/paiement/' + id_user +'/'+id_album+ '/'+ albums+'/'+quantite+'/'+montant+'/'+date;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/paiement/' + id_user +'/'+id_album+ '/'+ albums+'/'+quantite+'/'+montant+'/'+date;
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
  //recuperer l'historique de paiment de l'utilisateur
  getHistorique(id_user : number) : Observable<any> {
    var msg = "";
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/historique_user/' + id_user ;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/historique_user/' + id_user ;
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
  //recuperer l'historique de paiment de l'utilisateur
  updateStock(id_album : number, quantite: number) : Observable<any> {
    var msg = "";
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/modifier_stock_album/' + id_album +'_'+quantite ;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/modifier_stock_album/' + id_album +'_'+quantite ;
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

  //ajout des albums
  insertAlbum(titre : string, genre : string, annee : string, idartiste : number, nomartiste : string, prix : number, stock : number) : Observable<any> {
    var msg = "";
    
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      
      //let url = 'http://127.0.0.1:8000/insert_album/' + titre + "_" + genre + "_" + annee + "_" + idartiste + "_" + nomartiste + "_" + prix + "_" + stock;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/insert_album/' + titre + "_" + genre + "_" + annee + "_" + idartiste + "_" + nomartiste + "_" + prix + "_" + stock;
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

  //ajout des artistes
  insertArtiste(nom : string, prenom : string, nom_artiste : string) : Observable<any> {
    var msg = "";
    
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      
      //let url = 'http://127.0.0.1:8000/insert_artiste/' + nom + "/" + prenom + "/" + nom_artiste;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/insert_artiste/' + nom + "/" + prenom + "/" + nom_artiste;
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

  //ajout des chansons
  insertChanson(titre : string, id_album : number, duree : number) : Observable<any> {
    var msg = "";
    
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      
      //let url = 'http://127.0.0.1:8000/insert_chanson/' + titre + "_" + id_album + "_" + duree;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/insert_chanson/' + titre + "_" + id_album + "_" + duree;
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

   //recuperer l'historique de paiment 
   getHistoriquetot() : Observable<any> {
    var msg = "";
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/historique/';
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/historique/';
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

  
  updateStautCom(id : number, statut : string) : Observable<any> {
    var msg = "";
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/update_statut/' + id + "/" + statut ;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/update_statut/' + id + "/" + statut ;
      
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

  rechercheAlgolia(recherche : string) : Observable<any> {
    var msg = "";
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/search/' + recherche ;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/search/' + recherche ;
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

  //recuperer l'historique de paiment de l'utilisateur
  ajoutStock(id_album : number, quantite: number) : Observable<any> {
    var msg = "";
    // la méthode renvoie un observable et un Object en données
    return Observable.create((observer: Subscriber<any>) => {
      //let url = 'http://127.0.0.1:8000/ajout_stock_album/' + id_album + '_' + quantite ;
      let url = 'https://redpanda-backend-mwjszocsqa-ew.a.run.app/modifier_stock_album/' + id_album +'_'+quantite ;
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
