from typing import Optional
from sqlmodel import Field, SQLModel, Session, create_engine, select
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
import uvicorn
import datetime

class Artiste(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	nom: str
	prenom: str

class Album(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	annee: int
	artiste_id: int
	photo: str

class Chanson(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	num_album: int
	titre: str
	duree: float

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
		route = select(Chanson).where(Chanson.num_album == albumId)
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

#creer_musique()
#get_artistes()
#get_albums_by_artiste(1)
#get_songs_by_album(1)

#RECUPERER MUSIQUES
app = FastAPI(title="Magasin de vinyles")
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
<<<<<<< HEAD
#renvoie la liste de tous les albums
@app.get("/album")
async def index():
	data = get_albums()
	return jsonable_encoder(data)
if __name__ == "__main__":
	uvicorn.run(app, host="127.0.0.1", port=8000)
=======
if __name__ == "__main__":
	uvicorn.run(app, host="127.0.0.1", port=8000)
>>>>>>> 539a6c6ac16170ae7c04d01779e1eb86aab141bf
