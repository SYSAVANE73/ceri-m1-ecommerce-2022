CREATE DATABASE songs;
use songs;

CREATE TABLE user (
    userid int not null AUTO_INCREMENT,
    nom varchar(255),
    prenom varchar(255),
    login varchar(255),
    password varchar(255),
    PRIMARY KEY (userid)
);
INSERT INTO user(nom,prenom,login,password) VALUES ("SY","Ahmadou","diasy73","savane");

CREATE TABLE artiste (
    id int not null AUTO_INCREMENT,
    nom varchar(20),
    prenom varchar(20),
    nom_artiste varchar(30),
    PRIMARY KEY (id)
);

CREATE TABLE album (
    id int not null AUTO_INCREMENT,
    titre varchar(50),
    genre varchar(50),
    annee_sortie varchar(20),
    id_artiste int,
    prix    float,
    photo varchar(1000),
    nom_artiste varchar(30),
    PRIMARY KEY (id),
    FOREIGN KEY (id_artiste) REFERENCES artiste(id)
);

CREATE TABLE favoris (
    id int not null AUTO_INCREMENT,
    id_albums int,
    id_user int,
    PRIMARY KEY (id)
);


CREATE TABLE chanson (
    id int not null AUTO_INCREMENT,
    titre varchar(30),
    id_album int,
    duree float,
    PRIMARY KEY (id),
    FOREIGN KEY (id_album) REFERENCES album(id)
);

CREATE TABLE panier (
    id int not null AUTO_INCREMENT,
    id_albums int,
    montant_total float,
    id_user int,
    quantite int,
    PRIMARY KEY (id)
);

CREATE TABLE historique (
	id int not null AUTO_INCREMENT,
	id_user	int not null,
	id_albums JSON,
	nom_albums JSON,
	quantite JSON,
	montant float,
	date varchar(30),
	statut varchar(100),
	PRIMARY KEY(id)
)

INSERT INTO user(nom, prenom, login, password) VALUES("SY","Ahmadou","diasy73","savane");
INSERT INTO user(nom, prenom, login, password) VALUES("GDIRA","ghizlane","ghiz","123");
INSERT INTO user(nom, prenom, login, password) VALUES("FRESU","Ilona","ilona","fresu");

INSERT INTO artiste(nom, prenom, nom_artiste) VALUES("Sedraïa","Adila","Indila");
INSERT INTO album(titre,genre,annee_sortie,id_artiste,prix) VALUES("Mini World","French Urban Pop/R&B","2014",1,32.00);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Love Story",1,5.17);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Tourner dans le vide",1,4.20);
INSERT INTO chanson(titre,id_album,duree) VALUES ("S.O.S",1,4.20);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Dernière Danse",1,4.20);


INSERT INTO artiste(nom, prenom, nom_artiste) VALUES("Maitre","Gims","Maitre Gims");
INSERT INTO album(titre,genre,annee_sortie,id_artiste,prix,photo,nom_artiste) VALUES("Le Fleau","Hip-hop, Pop","2020",2,40.00,"https://static.fnac-static.com/multimedia/Images/FR/NR/12/40/c2/12730386/1507-1/tsp20201008141115/Le-Fleau.jpg","Maitre Gims");
INSERT INTO chanson(titre,id_album,duree) VALUES ("Immortel",2,2.27);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Coté Noir",2,3.51);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Oats",2,2.56);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Oro Jackson",2,3.00);


INSERT INTO artiste(nom, prenom, nom_artiste) VALUES("Ariana","Grande","Ariana Grande");
INSERT INTO album(titre,genre,annee_sortie,id_artiste,prix,photo,nom_artiste) VALUES("Sweetener","HPop, RnB contemporain, Trap","2018",3,50.00,"https://m.media-amazon.com/images/I/81FH-xfuK5L._SL1500_.jpg","Ariana Grande");
INSERT INTO chanson(titre,id_album,duree) VALUES ("God is Woman",3,3.17);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Sweetener",3,3.28);
INSERT INTO chanson(titre,id_album,duree) VALUES ("R.E.M",3,4.05);
INSERT INTO chanson(titre,id_album,duree) VALUES ("The ligth is coming",3,3.48);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Successful",3,3.47);

INSERT INTO artiste(nom, prenom, nom_artiste) VALUES("Black","Mesrime","Black M");
INSERT INTO album(titre,genre,annee_sortie,id_artiste,prix,photo,nom_artiste) VALUES("Les yeux plus gros que le monde","Pop, RnB contemporain, Rap","2014",4,25.00,"https://upload.wikimedia.org/wikipedia/en/9/9a/Les-yeux-plus-gros-que-le-monde-Black-M.jpg","Black M");
INSERT INTO chanson(titre,id_album,duree) VALUES ("spectateur",4,3.49);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Ailleurs",4,4.04);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Mme Pavosko",4,4.15);
INSERT INTO chanson(titre,id_album,duree) VALUES ("C'est tout moi",4,3.51);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Pour oublier",4,4.01);
INSERT INTO chanson(titre,id_album,duree) VALUES ("La légende Black (feat. Dr. Beriz)",4,3.48);


INSERT INTO album(titre,genre,annee_sortie,id_artiste,prix,photo,nom_artiste) VALUES("Eternel insatisfait (Réédition)","Pop, RnB contemporain, Rap","2017",4,35.00,"https://static.fnac-static.com/multimedia/Images/FR/NR/0c/2e/8b/9121292/1540-1/tsp20171011121549/Eternel-Insatisfait.jpg","Black M");
INSERT INTO chanson(titre,id_album,duree) VALUES ("Tic-Tac",5,3.57);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Tout recommencer",5,2.45);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Je suis chez moi",5,3.48);
INSERT INTO chanson(titre,id_album,duree) VALUES ("frérot (feat. Soprano)",5,3.46);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Dans ma tête",5,3.38);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Beautiful",5,3.36);


INSERT INTO artiste(nom, prenom, nom_artiste) VALUES("Rihanna","R","Rihanna");
INSERT INTO album(titre,genre,annee_sortie,id_artiste,prix,photo,nom_artiste) VALUES("Talk That Talk","Pop music, Rhythm and blues, Hip hop music","2011",5,25.00,"https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/9/0/4/0602527878409/tsp20120919055757/Talk-that-talk.jpg","Rihanna");
INSERT INTO chanson(titre,id_album,duree) VALUES ("You Da One",6,3.20);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Where Have You Been",6,4.02);
INSERT INTO chanson(titre,id_album,duree) VALUES ("We Found Love",6,3.35);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Birthday Cake",6,1.18);
INSERT INTO chanson(titre,id_album,duree) VALUES ("We All Want Love",6,3.57);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Drunk On Love",6,3.32);


INSERT INTO artiste(nom, prenom, nom_artiste) VALUES("Aya","Nakamura","Aya Nakamura");
INSERT INTO album(titre,genre,annee_sortie,id_artiste,prix,photo,nom_artiste) VALUES("VIP","French Urban Pop/R&B","2022",6,45.00,"https://images.genius.com/2beee3e2c0bb4acb0ab214a46229ec5c.1000x1000x1.jpg","Aya Nakamura");
INSERT INTO chanson(titre,id_album,duree) VALUES ("VIP",7,2.27);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Dégaine (feat. Damso)",7,3.30);
INSERT INTO chanson(titre,id_album,duree) VALUES ("djadja (feat. Maluma)",7,2.46);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Copines",7,2.51);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Djadja",7,2.51);

INSERT INTO panier(id_albums,montant_total,id_user,quantite) VALUES (1, 30.0, 2, 1);
INSERT INTO panier(id_albums,montant_total,id_user,quantite) VALUES (8, 45.0, 2, 1);
INSERT INTO panier(id_albums,montant_total,id_user,quantite) VALUES (3, 40.0, 1, 1);


INSERT INTO artiste(nom, prenom, nom_artiste) VALUES("Nzobazola","William","Ninho");
INSERT INTO album(titre,genre,annee_sortie,id_artiste,prix,photo,nom_artiste,stock) VALUES("Jefe","Rap français","2022",7,60.00,"https://cdn.shopify.com/s/files/1/0548/8554/8106/products/R_11.jpg?","Ninho",10);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Jefe",8,2.57);
INSERT INTO chanson(titre,id_album,duree) VALUES ("VVS",8,3.07);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Sky Priority",8,2.49);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Arme de poing",8,3.47);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Vérité",8,3.19);


INSERT INTO artiste(nom, prenom, nom_artiste) VALUES("Anne","Marie","Anne Marie");
INSERT INTO album(titre,genre,annee_sortie,id_artiste,prix,photo,nom_artiste,stock) VALUES("Therapy","Pop","2021",8,36.00,"https://m.media-amazon.com/images/I/81+8Ba1gyRL._SL1500_.jpg","Anne Marie",10);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Kis my (Uh Oh)",9,2.57);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Our song",9,2.44);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Beautiful",9,3.15);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Don't play",9,3.09);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Tell your girlfriend",9,2.15);


INSERT INTO artiste(nom, prenom, nom_artiste) VALUES("Kwnoles","Beyoncé","Beyoncé");
INSERT INTO album(titre,genre,annee_sortie,id_artiste,prix,photo,nom_artiste,stock) VALUES("Renaissance","Disco, Pop music, R&B, Dance-pop","2022",9,55.00,"https://m.media-amazon.com/images/I/61yO73-xTcL._SL1500_.jpg","Beyoncé",10);
INSERT INTO chanson(titre,id_album,duree) VALUES ("I'm That Girl",10,3.28);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Cuff It",10,3.45);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Church Girl",10,3.44);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Cozy",10,3.30);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Energy",10,1.56);
INSERT INTO chanson(titre,id_album,duree) VALUES ("Break My Soul",10,4.38);