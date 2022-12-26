import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../services/get-data.service';
import { Store } from '@ngrx/store';


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
      },
      (error) => {
    });
  }
}
