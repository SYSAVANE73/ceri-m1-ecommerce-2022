import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albumsTab = new Array();
  constructor() { }

  ngOnInit(): void {
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
