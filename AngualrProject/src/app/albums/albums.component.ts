import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../services/get-data.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  providers: [GetDataService]
})
export class AlbumsComponent implements OnInit {
  service : GetDataService;

  albumsTab = new Array();
  detailTab = {
    chanson: new Array()
  };

  constructor(_service:GetDataService, _http:HttpClient) { 
    this.service = _service;
    this.getAlbums();
  }

  ngOnInit(): void {
  }

  getAlbums(): void {
    this.service.getAlbums().subscribe(
      (data:any) => {
        this.albumsTab = data;
        console.log(this.albumsTab);
      },
      (error) => {

    });
  }

  getDetails(identifiant : number): void {
    console.log("identifiant est : "+identifiant);
    this.service.getDetails(identifiant).subscribe(
      (data:any) => {
        this.detailTab = data;
        console.log(this.detailTab);
      },
      (error) => {

    });
  }
  /*
  //Cette fonction permet d'afficher la liste des albums
  affichAlbums(){
    this.getAlbums().subscribe(
      (data:any) => {
        //console.log(data);
        this.albumsTab = data;
      },
      (error) => {
    });
  }
*/
}
