import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input()
  detailTab = {
    chanson: new Array()
  };


  @Input() message:string="";

  @Output() msg = new EventEmitter<string>();

  constructor(_service:GetDataService, _http:HttpClient) { 
    this.service = _service;
    this.getAlbums();
  }


  ngOnInit(): void {
    /*
    this.send.currentApprovalStageMessage.subscribe((msg) => {
      this.message = msg;
      console.log("-----> ", msg);
    });
    */
   console.log("connection ------> ", this.message);
    
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
  /*
  getUser(data: any): void{
    console.log(data);
  }
  */
}
