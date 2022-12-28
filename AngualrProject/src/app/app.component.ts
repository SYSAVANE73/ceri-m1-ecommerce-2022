import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './services/get-data.service';
import { ConnexionComponent } from './connexion/connexion.component';
import {State, Store} from '@ngrx/store';
import {initAction, changeUsername, nbAlbum} from './store/actions';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetDataService]
})
export class AppComponent implements OnInit {
  service : GetDataService;
  title = 'Ecommerce';

  vrai = false;
  public user = {} as any;
  
  constructor(_service:GetDataService, _http:HttpClient, private store: Store){
    this.service = _service;
    //this.socket.emit("Bonjour");
  }



  @Input()
  _VarGlob = {
    isLogged : false,
    id : 0,
    nom : "",
    prenom : "",
  };

  ngOnInit(): void {
    console.log("connecter ", this._VarGlob.isLogged)

    this.store.dispatch(initAction());

    this.store.select((state: any) => state.root.user).subscribe(response => {
      console.log('Selecteur ', response);
      this.user = response;
      console.log('user ', this.user);
    });

    this.store.select((State: any) => State.root.users).subscribe(data => {
      console.log('user --> ', data);
    });
  }

  getUser(data:any): void{
    this._VarGlob.nom = data.nom;
    console.log(data);
  }
  
  getInfo(): void{
    this.store.dispatch(changeUsername({username: "Ahmed"}));
  }

}
