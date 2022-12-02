import { Component, Input, OnInit , EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { ActivatedRoute , Router} from '@angular/router';
import {Store} from '@ngrx/store';
import { getUser } from '../store/actions';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  providers: [AuthentificationService]
})
export class ConnexionComponent implements OnInit {

  service : AuthentificationService;
  route : Router;

  user= {
    id: 0,
    nom: '',
    prenom: '',
    isloged: false
  };

  
  constructor(_service:AuthentificationService, _http:HttpClient, _router: Router, private store: Store) { 
    this.service = _service;
    this.route = _router;
  }


  isConnected = false;
  formGroup = new FormGroup ({
    login : new FormControl(''),
    password : new FormControl(''),
  });

  ngOnInit(): void {
    
  }

  goBack() {
    this.route.navigate(['/album']);
  }

  connexion(): void{

    var login = this.formGroup.value.login || "";
    var password = this.formGroup.value.password || "";
    //console.log(login, "---------", password);
    this.service.UserConnexion(login, password).subscribe(
      (data:any) => {
        if(data.length > 0){
          this.user.id = data[0].userid;
          this.user.nom = data[0].nom;
          this.user.prenom = data[0].prenom;
          this.user.isloged = true;

          this.store.dispatch(getUser({user : this.user}));

          this.goBack();
          this.formGroup.reset();
        }
        console.log(this.user);
      },
      (error) => {
    });

  }
}
