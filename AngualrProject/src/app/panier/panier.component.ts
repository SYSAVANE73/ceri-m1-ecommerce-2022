import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  providers: [GetDataService]
})
export class PanierComponent implements OnInit {
  service : GetDataService;
  route : Router;
  user= {
    id: 0,
    nom: '',
    prenom: '',
    isloged: false
  };

  panier = new Array();
  album = new Array();
  albums = {};
  quantite = 1;
  montantTotal = 0;

  constructor(_service:GetDataService, _router: Router, private store: Store) { 
    this.route = _router;
    this.service = _service;
  }

  ngOnInit(): void {
    this.store.select((State: any) => State.root.users).subscribe(data => {
      this.user = data;
    });
    this.getUserPanier(this.user.id);
  }

  getUserPanier(id : number): void {
    this.service.getPanier(id).subscribe(
      (data:any) => {
        this.panier = data;
        console.log('panier--> ',this.panier);
        for(let i=0; i<data.length; i++){
          //console.log("je suis ",data[i].id_albums);
          this.getAlbum(this.panier[i].id_albums);
        }
      },
      (error) => {

    });
  }

  getAlbum(id_albums : number): void {
    this.service.getAlbum(id_albums).subscribe(
      (data: any) => {
        console.log("Album -> ", data);
        this.montantTotal += data[0].prix; 
        this.album.push(data);
      }
    )
  }

  suppPannier(id_album: number): void {
    //console.log("supp-> ",id_album);
    this.service.deletePanier(this.user.id, id_album).subscribe(
      (data: any) => {
        console.log(data);
        this.route.navigate(['/album']);
      }
    )
  }
  incremente(): void {
    this.quantite ++;
  }

  decremente(): void {
    if(this.quantite >1) {
      this.quantite --;
    }
  }
}
