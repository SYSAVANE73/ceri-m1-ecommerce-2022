import { Component, Input, OnInit , EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { GetDataService } from '../services/get-data.service';
import { ActivatedRoute , Router} from '@angular/router';
import {Store} from '@ngrx/store';
import { getUser, nbAlbum, nbPanier } from '../store/actions';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  providers: [AuthentificationService, GetDataService]
})
export class ConnexionComponent implements OnInit {

  service : AuthentificationService;
  dataService : GetDataService;
  route : Router;

  user= {
    id: 0,
    nom: '',
    prenom: '',
    login: '',
    statut:'',
    isloged: false
  };

  
  constructor(_service:AuthentificationService, _dataService: GetDataService,_http:HttpClient, _router: Router, private store: Store) { 
    this.service = _service;
    this.route = _router;
    this.dataService = _dataService;
  }


  isConnected = false;
  formGroup = new FormGroup ({
    login : new FormControl(''),
    password : new FormControl(''),
  });

  ngOnInit(): void {
    this.isConnected = false;
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
          this.user.login = data[0].login;
          this.user.statut= data[0].statut;

          this.store.dispatch(getUser({user : this.user}));
          this.getAlbums(data[0].userid);
          this.getAlbumsPanier(data[0].userid);

          this.goBack();
          this.formGroup.reset();
        }
        this.isConnected = true;
        //console.log(this.user);
      },
      (error) => {
    });
  }
  //recuperation des albums de l'utilisateur dans favoris
  getAlbums(id: number): void {
    this.dataService.getFavoris(id).subscribe(
      (data:any) => {
        //console.log('favoris ',data.length);
        this.store.dispatch(nbAlbum({nbr: data.length}));
      },
      (error) => {
    });
  }
  //recuperation des albums de l'utilisateur dans le panier
  getAlbumsPanier(id: number): void {
    this.dataService.getPanier(id).subscribe(
      (data:any) => {
        //console.log('favoris ',data.length);
        this.store.dispatch(nbPanier({panier: data.length}));
      },
      (error) => {
    });
  }
}
