import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../services/get-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUser, nbAlbum, nbPanier } from '../store/actions';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css'],
  providers: [GetDataService]
})
export class CommandesComponent implements OnInit {

  historiqueTab = new Array();
  variable = "";
  service : GetDataService;
  route : ActivatedRoute;
  tabStatut  = ['En cours de préparation','En cours de livraison','Livrée']

  constructor(_service:GetDataService, _http:HttpClient, _router: ActivatedRoute) { 
    this.service = _service;
    this.route = _router;
  }

  ngOnInit(): void {
    this.getHistoriques();
  }

  updateCommandes(event:any, id: number): void{
    console.log('event ',event, id);
    
    this.service.updateStautCom(id,event).subscribe(
      (data:any) => {
        console.log(data);
      },
      (error) => {

    });
  }
 

  getHistoriques(): void {
    this.service.getHistoriquetot().subscribe(
      (data:any) => {
        this.historiqueTab = data;
        console.log(this.historiqueTab);
      },
      (error) => {

    });
  }
  /*
  updateCommandes(): void {
    this.service.updateStautCom(id,statut).subscribe(
      (data:any) => {
        this.historiqueTab = data;
        console.log(this.historiqueTab);
      },
      (error) => {

    });
  }
  */
}
