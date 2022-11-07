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

CREATE TABLE artiste (
    id int not null AUTO_INCREMENT,
    nom varchar(20),
    prenom varchar(20),
    PRIMARY KEY (id)
);

CREATE TABLE album (
    id int not null AUTO_INCREMENT,
    annee int,
    artiste_id int,
    photo varchar(300),
    PRIMARY KEY (id),
    FOREIGN KEY (artist_id) REFERENCES artiste(id)
);

CREATE TABLE chanson (
    id int not null AUTO_INCREMENT,
    num_album int,
    titre varchar(30),
    duree float,
    PRIMARY KEY (id),
    FOREIGN KEY (num_album) REFERENCES album(id)
);

INSERT INTO user(nom, prenom, login, password) VALUES ("SY", "AHMED", "diasy73", "savane");
INSERT INTO user(nom, prenom, login, password) VALUES ("GDIRA", "Ghizlane", "ghiz", "12345");

INSERT INTO artiste(nom, prenom) VALUES ("SY", "Ahmed");
INSERT INTO artiste(nom, prenom) VALUES ("GDIRA", "Gizlane");
INSERT INTO artiste(nom, prenom) VALUES ("FRESU", "Ilona");

INSERT INTO album(annee, artiste_id, photo) VALUES (2002, 1, "https://laigne-en-belin.fr/wp-content/uploads/2013/06/cd_5_angle.jpg");
INSERT INTO album(annee, artiste_id, photo) VALUES (2008, 2, "https://laigne-en-belin.fr/wp-content/uploads/2013/06/cd_5_angle.jpg");
INSERT INTO album(annee, artiste_id, photo) VALUES (2010, 3, "https://laigne-en-belin.fr/wp-content/uploads/2013/06/cd_5_angle.jpg");