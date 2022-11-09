import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'album', component: AlbumsComponent},
  {path: 'artiste', component: ArtisteComponent},
  {path: 'detail', component: DetailComponent},
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
    DetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
