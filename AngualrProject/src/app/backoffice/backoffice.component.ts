import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../services/get-data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css'],
  providers: [GetDataService]
})
export class BackofficeComponent implements OnInit {

  service : GetDataService;
  variable = "";
  idartiste : number = 0;
  nomartiste = "";
  albumsTab = new Array();
  artistesTab = new Array();

  @Input()
  detailTab = {
    chanson: new Array()
  };


  @Input() message:string="";

  @Output() msg = new EventEmitter<string>();

  constructor(_service:GetDataService, _http:HttpClient) { 
    this.service = _service;
    this.getAlbums();
  }

  formGroup = new FormGroup ({
    titre :  new FormControl(''),
    genre : new FormControl(''),
    annee : new FormControl(''),
    //idartiste : new FormControl(),
    nomartiste :  new FormControl(''),
    prix :  new FormControl(),
    photo :  new FormControl(''),
    stock :  new FormControl(),
  });

  formGroup1 = new FormGroup ({
    nom :  new FormControl(''),
    prenom : new FormControl(''),
    nom_artiste : new FormControl(''),
  });

  ngOnInit(): void {
    /*
    this.send.currentApprovalStageMessage.subscribe((msg) => {
      this.message = msg;
      console.log("-----> ", msg);
    });
    */
   console.log("connection ------> ", this.message);
    this.getArtistess();
  }

  getAlbums(): void {
    this.service.getAlbums().subscribe(
      (data:any) => {
        this.albumsTab = data;
        //console.log(this.albumsTab);
      },
      (error) => {

    });
  }

  getDetails(identifiant : number): void {
    this.service.getDetails(identifiant).subscribe(
      (data:any) => {
        this.detailTab = data;
        //console.log(this.detailTab);
      },
      (error) => {

    });
  }

  getArtistess(): void {
    this.service.getArtistes().subscribe(
      (data:any) => {
        this.artistesTab = data;
        console.log("Listes Artistes:");
        console.log(this.artistesTab);
      },
      (error) => {

    });
  }

  selectArtiste(event:any): void{
    this.idartiste  = event.id;
    this.nomartiste = event.nom_artiste;
  }
  
  ajoutAlbum(): void {
    
    var titre = this.formGroup.value.titre || "";
    var genre = this.formGroup.value.genre || "";
    var annee = this.formGroup.value.annee || "";
    //var idartiste = this.formGroup.value.idartiste || 0;
    //var nomartiste = this.formGroup.value.nomartiste || "";
    var prix = this.formGroup.value.prix || 0;
    var photo = this.formGroup.value.photo || "";
    var stock = this.formGroup.value.stock || 0;
    console.log("id artiste",this.idartiste);
    console.log("nom artiste",this.nomartiste);
    
    this.service.insertAlbum(titre, genre, annee, this.idartiste, this.nomartiste, prix, photo, stock)
    .subscribe(
      (data:any) => {
        console.log(data);
      }, (error) => {
    });
    
  }

  ajoutArtiste(): void {
    
    var nom = this.formGroup1.value.nom || "";
    var prenom = this.formGroup1.value.prenom || "";
    var nom_artiste = this.formGroup1.value.nom_artiste || "";
    
    this.service.insertArtiste(nom, prenom, nom_artiste)
    .subscribe(
      (data:any) => {
        console.log(data);
      }, (error) => {
    });
    
  }

}
