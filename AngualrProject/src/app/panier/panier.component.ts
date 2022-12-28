import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetDataService } from '../services/get-data.service';
import { update, nbPanier } from '../store/actions';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  providers: [GetDataService, DatePipe]
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
  quantite = new Array();
  montantTotal = 0;
  stock = 0;
  listeQuantite = [1,2,3,4,5];
  paiemt = false;

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
        if(data.length > 0){
          for(let i=0; i<data.length; i++){
            //console.log("je suis ",data[i].id_albums);
            this.getAlbum(this.panier[i].id_albums);
          }
          this.paiemt = false;
        } else {
          this.paiemt = true;
        }
        
        this.store.dispatch(nbPanier({panier: data.length}));
      },
      (error) => {

    });
  }

  getAlbum(id_albums : number): void {
    this.service.getAlbum(id_albums).subscribe(
      (data: any) => {
        console.log("Album -> ", data);
        this.montantTotal += data[0].prix * this.panier[0].quantite;
        console.log('total ',this.montantTotal);
        this.quantite.push(data[0].stock);
        this.album.push(data);
      }
    )
  }

  suppPannier(id_album: number): void {
    this.service.deletePanier(this.user.id, id_album).subscribe(
      (data: any) => {
        //console.log(data);
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
  paie = false;
  paiement(): void{
    var d = new Date();
    var date = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
    var id_album = ""
    var id_albums = ""
    var quantite_paie = ""
    var montant = 0;
    for(let i=0; i<this.album.length; i++){
      //console.log('---> ',this.album[i][0].id, this.album[i][0].titre, this.panier[i].quantite);
      id_album += this.album[i][0].id +"-";
      id_albums += this.album[i][0].titre + "-";
      quantite_paie += this.panier[i].quantite + "-";
      montant += this.panier[i].quantite * this.album[i][0].prix;
      this.miseAJourStock(this.album[i][0].id,this.panier[i].quantite);
    }

    this.service.insertHistorique(this.user.id,id_album,id_albums,quantite_paie,montant,date).subscribe(
      (data: any) => {
        console.log(data);
      }
    )
    this.paie = true;
  }
  selectChange(q: number, stock:number): void{
    if(q > stock){
      this.paiemt = true;
    } else {
      this.paiemt = false;
    }
  }

  miseAJourStock(id_album: number, quantite: number): void{
    this.service.updateStock(id_album,quantite).subscribe(
      (data: any) => {
        console.log(data);
      }
    )
  }
  
}
