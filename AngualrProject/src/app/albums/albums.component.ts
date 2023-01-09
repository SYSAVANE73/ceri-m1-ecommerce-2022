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

  recherche ="";

  albumsTab = new Array();
  rechercheTab = new Array();
  albumsTabFilter =  new Array();
  @Input()
  detailTab = {
    chanson: new Array()
  };
  vrai : boolean = false;
  value = "";
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
    //depuis le store recuperer les informations de l'utilisateur
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
  //pour recuperer tous les albums dans la base
  getAlbums(): void {
    this.service.getAlbums().subscribe(
      (data:any) => {
        this.albumsTab = data;
        this.albumsTabFilter = data;
        //console.log(this.albumsTab);
      },
      (error) => {
    });
  }
  //pour afficher la page de détails lorsque l'on clique sur un album
  getDetails(identifiant : number): void {
    this.service.getDetails(identifiant).subscribe(
      (data:any) => {
        this.detailTab = data;
        //console.log(this.detailTab);
      },
      (error) => {
    });
  }
  //ajouter un album dans favoris
  ajoutFavoris(id_album: number): void {
    //console.log('ajouter dans favorie', id_album, this.user.id);
    this.service.insertFavoris(id_album, this.user.id).subscribe(
      (data:any) => {
        console.log(data);
        //Mise à jour du nombre d'album dans favoris
        this.store.dispatch(nbAlbum({nbr: this.nbrAlbum + 1}));
      },
      (error) => {
    });
  }
  //cette fonction permet de filtrer la liste d'album par titre, genre, nom d'artiste
  filters(event: any): void{
    this.value = event.target.value;
    this.albumsTabFilter = this.albumsTab.filter((album) => {
      return album.titre.includes(this.value) || album.genre.includes(this.value) || album.nom_artiste.includes(this.value);
    });
  }

  //Recherche algolia
  searchAlgolia(event: any): void {
    this.recherche = event.target.value;
    this.rechercheTab = [];
    this.service.rechercheAlgolia(event.target.value).subscribe(
      (data:any) => {
        //this.rechercheTab = data;
        console.log(data);
        for (let i=0; i < data[1].length;i++){
          //console.log(data[1][i]);
          this.rechercheTab.push(data[1][i]._highlightResult);
        }
        console.log('recherche ',this.rechercheTab);
      },
      (error) => {
    });
  }

}
