import { Component, Input, OnInit , EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { ActivatedRoute , Router} from '@angular/router';
import {Store} from '@ngrx/store';
import { getUser } from '../store/actions';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  providers: [AuthentificationService]
})
export class InscriptionComponent implements OnInit {

  service : AuthentificationService;
  route : Router;
  isConnected = false;

  constructor(_service:AuthentificationService, _http:HttpClient, _router: Router, private store: Store) {
    this.service = _service;
    this.route = _router;
  }

  formGroup = new FormGroup ({
    nom :  new FormControl(''),
    prenom : new FormControl(''),
    login : new FormControl(''),
    password : new FormControl(''),
  });

  ngOnInit(): void {
    this.isConnected = false;
  }

  inscription(): void{

    var login = this.formGroup.value.login || "";
    var password = this.formGroup.value.password || "";
    var nom = this.formGroup.value.nom || "";
    var prenom = this.formGroup.value.prenom || "";
    //console.log(login, "---------", password);
    this.service.UserInscription(nom, prenom,login,password).subscribe(
      (data:any) => {
        //console.log(data);
      },
      (error) => {
    });

  }

}
