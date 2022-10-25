import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './services/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetDataService]
})
export class AppComponent implements OnInit {
  service : GetDataService;
  title = 'Ecommerce';

  constructor(_service:GetDataService, _http:HttpClient){
    this.service = _service;
  }

  ngOnInit(): void {
      
  }
}
