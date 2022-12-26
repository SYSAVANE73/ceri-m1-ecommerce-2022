import { Component, OnInit, Input , EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { disconnect, getUser, update, nbAlbum } from '../store/actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  route : Router;
  public vrai = false;
  user= {
    id: 0,
    nom: '',
    prenom: '',
    isloged: false
  };
  userdisconnect= {
    id: 0,
    nom: '',
    prenom: '',
    isloged: false
  };
  nbrAlbum = 0;

  constructor(_router: Router, private store: Store) {
    this.route = _router;
  }


  ngOnInit(): void {
    
    this.store.select((State: any) => State.root.users).subscribe(data => {
      this.user = data;
      console.log('user --> ', data);
      if(this.user.isloged == true){
        this.vrai = true;
      }
      else{
        this.vrai = false;
      }
    });

    //pour recuperer le nombre d'album dans le store
    this.store.select((State: any) => State.root.nbr).subscribe(data => {
      //this.user = data;
      this.nbrAlbum = data;
      //console.log('count ', data);
    });
  }

  deconnection(): void {
    if(this.user.isloged == true){
      this.vrai = false;
      this.route.navigate(['/album']);
    }
    this.store.dispatch(getUser({user : this.userdisconnect}));
  }

  panier(): void {
    if(this.vrai == true){
      this.route.navigate(['/panier']);
    }
    else{
      this.route.navigate(['/login']);
    }
  }

}
