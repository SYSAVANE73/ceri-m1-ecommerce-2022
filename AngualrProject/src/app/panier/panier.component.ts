import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetDataService } from '../services/get-data.service';
import { update } from '../store/actions';
import { FormGroup, FormControl } from '@angular/forms';

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
  stock = 0;
  listeQuantite = [1,2,3,4,5];

  constructor(_service:GetDataService, _router: Router, private store: Store) { 
    this.route = _router;
    this.service = _service;
  }

  form = new FormGroup({
    quantite: new FormControl(1),
  });

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
        var q = this.form.value.quantite || 0;
        this.montantTotal += data[0].prix; 
        this.album.push(data);
      }
    )
  }

  suppPannier(id_album: number): void {
    this.service.deletePanier(this.user.id, id_album).subscribe(
      (data: any) => {
        console.log(data);
        //this.route.navigate(['/album']);
        //on met à jour la liste des album après suppression
        
        this.store.dispatch(update({vrai: true}));
        //mise à jour de la liste des albums après suppression
        this.store.select((State: any) => State.root.vrai).subscribe(data => {
          this.album = [];
          this.montantTotal= 0;
          console.log('vous venez de supprimer');
          //this.ngOnInit();
          this.getUserPanier(this.user.id);
        }); 
      }
    )
  }

  getQuantite(): void{
    console.log('auantite ',this.form.value.quantite);
  }
}
