import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { GetDataService } from './services/get-data.service';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArtisteComponent } from './artiste/artiste.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { reduceState, StoreModule } from '@ngrx/store';
import {metaReducers, rootReducer} from './store/reducer';
import { InscriptionComponent } from './inscription/inscription.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'album', component: AlbumsComponent},
  {path: 'artiste', component: ArtisteComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'login', component: ConnexionComponent},
  {path: 'inscrire', component: InscriptionComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    PageNotFoundComponent,
    ArtisteComponent,
    NavigationComponent,
    HomeComponent,
    DetailComponent,
    ConnexionComponent,
    InscriptionComponent
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
