from typing import Optional, Union, List
from sqlmodel import Field, SQLModel, Session, create_engine, select, JSON, Column
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import datetime
#import pymysql
#import MySQLdb


class Artiste(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	nom: str
	prenom: str
	nom_artiste: str

class Album(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	titre: str
	genre: str
	annee_sortie: str
	id_artiste: int
	prix: float
	photo: str
	nom_artiste: str

class Chanson(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	titre: str
	id_album: int
	duree: float

class User(SQLModel, table=True):
	userid: Optional[int] = Field(default=None, primary_key=True)
	nom: str
	prenom: str
	login: str
	password: str

class Panier(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	id_user: int
	id_albums: List[int] = Field(sa_column=Column(JSON))
	montant_total: float

engine = create_engine("sqlite:///database.db")
SQLModel.metadata.create_all(engine)


def creer_musique():
	artiste1 = Artiste(nom="x", prenom="x")
	artiste2 = Artiste(nom="y", prenom="y")
	album1 = Album(annee=2022, artiste_id=1, photo="img")
	album2 = Album(annee=2022, artiste_id=2, photo="img")
	chanson1 = Chanson(num_album=10, titre="chanson1", duree=1.0)
	with Session(engine) as session:
		session.add(artiste1)
		session.add(artiste2)
		session.add(album1)
		session.add(album2)
		session.add(chanson1)
		session.commit()
def creer_panier():
	listAlb = [1, 2]
	panier1 = Panier(id_user=1, id_albums=listAlb, montant_total=100)
	with Session(engine) as session:
		session.add(panier1)
		session.commit()

#ROUTES
def get_artistes():
	with Session(engine) as session:
		route = select(Artiste)
		res = session.exec(route)
		artistes = res.all()
		for artiste in artistes:
			print(artiste)
		return artistes
def get_songs_by_album(albumId):
	with Session(engine) as session:
		route = select(Chanson).where(Chanson.id_album == albumId)
		res = session.exec(route)
		album = res.all()
		for chanson in album:
			print(chanson)
		return album
def get_albums_by_artiste(artisteId):
	with Session(engine) as session:
		route = select(Album).where(Album.artiste_id == artisteId)
		res = session.exec(route)
		albums = res.all()
		for album in albums:
			print(album)
		return albums
def get_albums():
	with Session(engine) as session:
		route = select(Album)
		res = session.exec(route)
		albums = res.all()
		return albums
		"""
		for album in albums:
			print(album)
		return albums
		"""
def get_albums_by_id(id_album):
	with Session(engine) as session:
		route = select(Album).where(Album.id == id_album)
		res = session.exec(route)
		albums = res.all()
		return albums
		"""
		for album in albums:
			print(album)
		return albums
		"""

def get_user(login, password):
	with Session(engine) as session:
		route = select(User).where((User.login == login) and (User.password == password))
		res = session.exec(route)
		users = res.all()
		for user in users:
			print(user)
		return users
def get_user_by_id(login):
	with Session(engine) as session:
		route = select(User).where(User.login == login)
		res = session.exec(route)
		users = res.all()
		for user in users:
			print(user)
		return users

def get_panier(id):
	with Session(engine) as session:
		route = select(Panier).where(Panier.id_user == id)
		res = session.exec(route)
		paniers = res.all()
		for panier in paniers:
			print(panier)
		return paniers
def get_paniers():
	with Session(engine) as session:
		route = select(Panier)
		res = session.exec(route)
		paniers = res.all()
		for panier in paniers:
			print(panier)
		return paniers
#creer_musique()
#get_artistes()
#get_albums_by_artiste(1)
#get_songs_by_album(1)
#creer_panier()

#RECUPERER MUSIQUES
app = FastAPI(title="Magasin de vinyles")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#renvoie tous les artistes
@app.get("/")
async def index():
	data = get_artistes()
	return jsonable_encoder(data)

#renvoie toutes les chansons d'un album 
@app.get("/album/{album_id}")
async def read_album_details(album_id: int):
	data = get_songs_by_album(album_id)
	return jsonable_encoder(data)

#renvoie tous les albums d'un artiste
@app.get("/artiste/{artiste_id}")
async def read_album_details(artiste_id: int):
	data = get_albums_by_artiste(artiste_id)
	return jsonable_encoder(data)

#renvoie la liste de tous les albums
@app.get("/album")
async def index():
	data = get_albums()
	return jsonable_encoder(data)

#renvoie les informations d'un album
@app.get("/getAlbum/{id_album}")
async def get_albums_id(id_album: int):
	data = get_albums_by_id(id_album)
	return jsonable_encoder(data)

#affiche le panier d'un utilisateur
@app.get("/panier/{id_user}")
async def get_panier_by_id(id_user: int):
	data = get_panier(id_user)
	return jsonable_encoder(data)
@app.get("/paniers/")
async def get_all_paniers():
	data = get_paniers()
	return jsonable_encoder(data)

#verification de la connexion
@app.get("/login/{login}/{pwd}")
async def get_users(login: str, pwd: str):
	data = get_user(login, pwd)
	return jsonable_encoder(data)

#test de l'api
@app.get("/test/{test}")
async def test(test: str):
	return {"test": test}


if __name__ == "__main__":
	uvicorn.run(app, host="127.0.0.1", port=8000)
