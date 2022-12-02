import { Component, OnInit, Input , EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { disconnect, getUser } from '../store/actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  user= {
    id: 0,
    nom: '',
    prenom: '',
    isloged: false
  };

  constructor(private store: Store) {}


  ngOnInit(): void {
    
    this.store.select((State: any) => State.root.users).subscribe(data => {
      this.user = data;
      console.log('user --> ', data);
    });

  }

  deconnection(): void {
    //this.user.id = 0;
    //this.user.nom = '';
    //this.user.prenom = '';
    //this.user.isloged = false;

    //this.store.dispatch(disconnect({user : this.user}));
    this.store.dispatch(disconnect({isloged : false}));
  }

}
