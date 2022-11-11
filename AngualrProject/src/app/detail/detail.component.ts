import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../services/get-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SendDataService } from '../services/send-data.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [GetDataService, SendDataService]
})
export class DetailComponent implements OnInit {

  service : GetDataService;
  sendService : SendDataService;
  route : ActivatedRoute;

  //detailTab = new Array(); 
  detailTab = new Array();
  data = new Array();
  album = new Array();

  @Input()
  public test = "";

  id : number= 0;
  iddd : string = "";
  languages = []
  

  constructor(_service:GetDataService, _http:HttpClient, _router: ActivatedRoute, _send:SendDataService) { 
    this.service = _service;
    this.sendService = _send;
    this.route = _router;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      //this.iddd = params.get('id') ;
      //const name: params.get('id') || 0 ;
      //this.id = parseInt(name);
      const iddid = params.get('id');
      console.log("id--> ",parseInt(iddid || ""));
      this.getDetails(parseInt(iddid || ""));

      this.getAlbums(parseInt(iddid || ""));
      //this.getData();
      
    })
  }

  getDetails(identifiant : number): void {
    console.log("identifiant ",identifiant)
    this.service.getDetails(identifiant).subscribe(
      (data:any) => {
        this.detailTab = data;
      },
      (error) => {

    });
  }

  getAlbums(identifiant : number): void {
    this.service.getAlbum(identifiant).subscribe(
      (data:any) => {
        this.album = data;
        console.log("---->", this.album);
      },
      (error) => {

    });
  }

  getData(){
    this.sendService.data.subscribe(response => {
      console.log('response ',response);
    })
  }

}
