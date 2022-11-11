import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../services/get-data.service';
import { SendDataService } from '../services/send-data.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  providers: [GetDataService,SendDataService]
})
export class AlbumsComponent implements OnInit {
  service : GetDataService;
  sendService : SendDataService;

  @Input()
  public albumsTab = new Array();
  @Input()
  public detailTab = {
    chanson: new Array()
  };
  @Input()
  public taille = "bonjourhghghg";

  @Input()
  public id : number = 0;

  languages = ['Java', 'Python', 'JavaScript', 'Go']

  constructor(_service:GetDataService, _http:HttpClient, _send:SendDataService) { 
    this.service = _service;
    this.sendService = _send;
    this.getAlbums();
  }

  ngOnInit(): void {
    this.sendService.updatedata(this.taille);
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
    //this.sendService.send_data.next(this.languages);

    //this.sendService.updatedata(this.languages);

    this.id = identifiant;
    console.log("identifiant est : "+identifiant);
    console.log("id ", this.id);
    this.service.getDetails(identifiant).subscribe(
      (data:any) => {
        this.detailTab = data;
        //this.sendService.updatedata("this.detailTab");
        //console.log(this.detailTab);
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
