import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [GetDataService]
})
export class DetailComponent implements OnInit {

  service : GetDataService;

  //detailTab = new Array();

  @Input() detailTab = {
    chanson: new Array()
  };

  constructor(_service:GetDataService, _http:HttpClient) { 
    this.service = _service;
    //this.getDetails();
  }

  ngOnInit(): void {
  }

  getDetails(identifiant : number): void {
    this.service.getDetails(identifiant).subscribe(
      (data:any) => {
        this.detailTab = data;
        console.log(this.detailTab);
      },
      (error) => {

    });
  }

}
