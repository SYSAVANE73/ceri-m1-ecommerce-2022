import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';
import { Store } from '@ngrx/store';
import { update, nbAlbum, nbPanier } from '../store/actions';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css'],
  providers : [GetDataService]
})
export class FavorisComponent implements OnInit {
  service : GetDataService;
  route : Router;
  user= {
    id: 0,
    nom: '',
    prenom: '',
    isloged: false
  };
  albumsTab = new Array();
  nbAlbum = 0;
  nbPanier = 0;

  constructor(_service:GetDataService, _router: Router, private store: Store) { 
    this.route = _router;
    this.service = _service;
  }

  ngOnInit(): void {
    this.store.select((State: any) => State.root.users).subscribe(data => {
      this.user = data;
    });
    this.getAlbums(this.user.id);

    //pour recuperer le nombre d'album dans le panier
    this.store.select((State: any) => State.root.panier).subscribe(data => {
      this.nbPanier = data;
      //console.log('nb panier--> ', data);
    });  
  }

  //recuperation des albums de l'utilisateur dans le panier
  getAlbums(id: number): void {
    this.service.getFavoris(id).subscribe(
      (data:any) => {
        console.log('favoris ',data);
        //pour mettre à le nombre de favoris dans la navigation
        this.store.dispatch(nbAlbum({nbr: data.length}));
        if(data.length > 0){
          for(let i=0; i<data.length; i++){
            //this.getDetails(data[i].id_albums);
            this.getAlbum(data[i].id_albums);
          }
        }
      },
      (error) => {
    });
  }

  getAlbum(identifiant : number): void {
    this.service.getAlbum(identifiant).subscribe(
      (data:any) => {
        this.albumsTab.push(data);
        //console.log('favoris-albums ',data);
        //console.log(this.detailTab);
      },
      (error) => {

    });
  }
  suppFavoris(id_album: number): void {
    console.log('ajouter dans favorie', id_album, this.user.id);
    this.service.deleteFavoris(id_album, this.user.id).subscribe(
      (data:any) => {
        //console.log(data);

        this.store.dispatch(update({vrai: true}));
        //mise à jour de la liste après suppression
        this.store.select((State: any) => State.root.vrai).subscribe(data => {
          this.albumsTab = [];
          //console.log('vous venez de supprimer');
          //this.ngOnInit();
          this.getAlbums(this.user.id);
        });
      },
      (error) => {
    });
  }

  ajoutPanier(id_album: number,prix: number): void {
    this.service.insertPanier(this.user.id, id_album, prix)
    .subscribe(
      (data:any) => {
        //console.log(data);
        //mise à jour du nombre d'album dans le panier
        this.store.dispatch(nbPanier({panier: this.nbPanier + 1}));
      }, (error) => {
    });
  }
}
