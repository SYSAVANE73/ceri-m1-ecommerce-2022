import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css'],
  providers: [GetDataService]
})
export class CompteComponent implements OnInit {

  service : GetDataService;
  route : Router;
  user= {
    id: 0,
    nom: '',
    prenom: '',
    login: '',
    statut:'',
    isloged: false
  };
  historique = new Array();
  str : string= "Apples are round";
  exemple = this.str.split(" ");
  listeAlbums = [];
  listeQuantite = [];

  constructor(_service:GetDataService, _router: Router, private store: Store) { 
    this.route = _router;
    this.service = _service;
  }

  ngOnInit(): void {
    this.store.select((State: any) => State.root.users).subscribe(data => {
      this.user = data;
    });
    this.getHistoriquePaie(this.user.id);
    console.log('exemple--> ',this.exemple);
  }

  getHistoriquePaie(id : number): void {
    this.service.getHistorique(id).subscribe(
      (data:any) => {
        this.historique = data;
        console.log('histporique--> ',this.historique);
      },
      (error) => {
    });
  }
}
