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
        //console.log(this.panier);
        for(let i=0; i<data.length; i++){
          console.log("je suis ",data[i].id_albums);
          this.getAlbum(this.panier[i].id_albums);
        }
      },
      (error) => {

    });
  }

  getAlbum(id_albums : number): void {
    this.service.getAlbum(id_albums).subscribe(
      (data: any) => {
        this.album.push(data);
        console.log("Album -> ", this.album);
      }
    )
  } 

}
