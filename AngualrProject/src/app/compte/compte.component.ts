import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css'],
  providers: [GetDataService, AuthentificationService]
})
export class CompteComponent implements OnInit {

  service : GetDataService;
  auth : AuthentificationService
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

  formGroup = new FormGroup ({
    nom :  new FormControl(''),
    prenom : new FormControl(''),
    login : new FormControl(''),
  });

  constructor(_service:GetDataService, _auth: AuthentificationService, _router: Router, private store: Store) { 
    this.route = _router;
    this.service = _service;
    this.auth = _auth;
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

  updateUser(): void {
    var new_login = this.formGroup.value.login || "";
    var nom = this.formGroup.value.nom || "";
    var prenom = this.formGroup.value.prenom || "";
    console.log('update ',new_login, nom, prenom);

    this.auth.updateUserInfo(this.user.login, nom, prenom, new_login).subscribe(
      (data:any) => {
        console.log(data);
      },
      (error) => {
    });

  }
}
