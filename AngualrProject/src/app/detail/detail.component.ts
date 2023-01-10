import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../services/get-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUser, nbAlbum, nbPanier } from '../store/actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [GetDataService]
})
export class DetailComponent implements OnInit {

  service : GetDataService;
  route : ActivatedRoute;

  user= {
    id: 0,
    nom: '',
    prenom: '',
    isloged: false
  };

  detailTab = new Array();
  album = new Array();
  vrai : boolean = false;

  id_user : number= 0;
  id_album : number = 0;
  montant : number = 0.0;

  message:string = "";
  nbPanier = 0;

  constructor(_service:GetDataService, _http:HttpClient, _router: ActivatedRoute, private store: Store) { 
    this.service = _service;
    this.route = _router;
  }

  ngOnInit(): void {

    this.store.select((State: any) => State.root.users).subscribe(data => {
      this.user = data;
      //console.log('user --> panier ', data);
      
      if(this.user.isloged == true){
        this.id_user = this.user.id;
        this.vrai = true;
      } else{
        this.id_user = 0;
        this.vrai = false;
      }
    });

    this.route.paramMap.subscribe(params => {
      const iddid = params.get('id');
      //console.log("id--> ",parseInt(iddid || ""));
      this.getDetails(parseInt(iddid || ""));

      this.getAlbums(parseInt(iddid || ""));
    })
  
    //pour recuperer le nombre d'album dans le panier
    this.store.select((State: any) => State.root.panier).subscribe(data => {
      this.nbPanier = data;
      //console.log('nb panier--> ', data);
    });  
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
        //console.log("---->", this.album);
        this.id_album = data[0].id;
      },
      (error) => {

    });
  }

  ajoutPanier(): void {
    this.service.insertPanier(this.id_user, this.id_album, this.album[0].prix).subscribe(
      (data:any) => {
        this.message = data;
        //console.log("msg ",this.message);

        //mise à jour du nombre d'album dans le panier
        this.store.dispatch(nbPanier({panier: this.nbPanier + 1}));
      }, (error) => {
    });
    
  }
}
