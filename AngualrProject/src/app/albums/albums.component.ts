import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../services/get-data.service';
import { Store } from '@ngrx/store';
import { getUser, nbAlbum, nbPanier } from '../store/actions';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  providers: [GetDataService]
})
export class AlbumsComponent implements OnInit {
  service : GetDataService;

  albumsTab = new Array();
  @Input()
  detailTab = {
    chanson: new Array()
  };
  vrai : boolean = false;
  user= {
    id: 0,
    nom: '',
    prenom: '',
    isloged: false
  };
  nbrAlbum = 0;

  constructor(_service:GetDataService, _http:HttpClient, private store: Store) { 
    this.service = _service;
    this.getAlbums();
  }

  ngOnInit(): void {
    this.store.select((State: any) => State.root.users).subscribe(data => {
      this.user = data;
      
      if(this.user.isloged == true){
        this.vrai = true;
      } else{
        this.vrai = false;
      }
    });
    //pour recuperer le nombre d'album dans le store
    this.store.select((State: any) => State.root.nbr).subscribe(data => {
      this.nbrAlbum = data;
    });
  }

  getAlbums(): void {
    this.service.getAlbums().subscribe(
      (data:any) => {
        this.albumsTab = data;
        //console.log(this.albumsTab);
      },
      (error) => {

    });
  }

  getDetails(identifiant : number): void {
    this.service.getDetails(identifiant).subscribe(
      (data:any) => {
        this.detailTab = data;
        //console.log(this.detailTab);
      },
      (error) => {
    });
  }

  ajoutFavoris(id_album: number): void {
    console.log('ajouter dans favorie', id_album, this.user.id);
    this.service.insertFavoris(id_album, this.user.id).subscribe(
      (data:any) => {
        console.log(data);
        //Mise à jour du nombre de favoris
        this.store.dispatch(nbAlbum({nbr: this.nbrAlbum + 1}));
      },
      (error) => {
    });
  }
}
