import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { GetDataService } from './services/get-data.service';
import { HttpClientModule } from '@angular/common/http';
import { ArtisteComponent } from './artiste/artiste.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { reduceState, StoreModule } from '@ngrx/store';
import {metaReducers, rootReducer} from './store/reducer';
import { PanierComponent } from './panier/panier.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { CompteComponent } from './compte/compte.component';
import { FavorisComponent } from './favoris/favoris.component';
import { CommandesComponent } from './commandes/commandes.component';
import { AjouterchansonComponent } from './ajouterchanson/ajouterchanson.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'album', component: AlbumsComponent},
  {path: 'artiste', component: ArtisteComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'login', component: ConnexionComponent},
  {path: 'panier', component: PanierComponent},
  {path: 'inscrire', component: InscriptionComponent},
  {path: 'edit', component: BackofficeComponent},
  {path: 'compte', component: CompteComponent},
  {path: 'favoris', component: FavorisComponent},
  {path: 'commandes', component: CommandesComponent},
  {path: 'ajoutchanson/:id', component: AjouterchansonComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    ArtisteComponent,
    NavigationComponent,
    HomeComponent,
    DetailComponent,
    ConnexionComponent,
    PanierComponent,
    InscriptionComponent,
    BackofficeComponent,
    CompteComponent,
    FavorisComponent,
    CommandesComponent,
    AjouterchansonComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      root: rootReducer
    }, {
      metaReducers: metaReducers
    })
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
