import { Component, OnInit, Input , EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { disconnect, getUser, logOut } from '../store/actions';

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

  constructor(_router: Router, private store: Store) {
    this.route = _router;
  }


  ngOnInit(): void {
    
    this.store.select((State: any) => State.root.users).subscribe(data => {
      this.user = data;
      //console.log('user --> ', data);
      if(this.user.isloged == true){
        this.vrai = true;
      }
      else{
        this.vrai = false;
      }
    });

  }

  deconnection(): void {
    if(this.user.isloged == true){
      this.vrai = false;
      this.route.navigate(['/album']);
    }
    //on met le store à jour une fois que l'utilisateur se deconnecte
    this.store.dispatch(logOut());
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
