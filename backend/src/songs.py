from typing import Optional
from sqlmodel import Field, SQLModel, Session, create_engine, select
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from starlette.config import Config
import uvicorn
import datetime
import MySQLdb

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


#connect_string = "mysql+pymysql://root:root@localhost:3306/songs"

config = Config(".env")

"""
user_name = config("user_name", cast=str)
password = config("password", cast=str)
host = config("host", cast=str)
database_name = config("database_name", cast=str)
"""

#import os

#os.environ
#export DB_ADRESS = 'dffdf"
"""
os.environ.get('DB_ADRESS')

si on utilise fichier .env
pydantic
Base Settings
ENV > fichier

si fichier
entrypoint:
echo ENV.var.env
"""

"""
user_name = "root"
password = "root"
host = "mysql"
database_name = "songs"
"""
DATABASE_USERNAME = ""
DATABASE_PASSWORD = ""
host = ""
DATABASE_NAME = ""

DATABASE = 'mysql://%s:%s@%s/%s?charset=utf8' % (
    user_name,
    password,
    host,
    database_name,
)
engine = create_engine(
	DATABASE,
	encoding = "utf-8",
	echo = True
)
#engine = create_engine("sqlite:///database.db")
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
		route = select(Chanson).where(Chanson.id_album == albumId)
		res = session.exec(route)
		album = res.all()
		for chanson in album:
			print(chanson)
		return album

def get_albums_by_artiste(artisteId):
	with Session(engine) as session:
		route = select(Album).where(Album.id_artiste == artisteId)
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
def get_user():
	with Session(engine) as session:
		route = select(User)
		res = session.exec(route)
		albums = res.all()
		return albums
		

#creer_musique()
#get_artistes()
#get_albums_by_artiste(1)
#get_songs_by_album(1)

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

#test de l'api
@app.get("/test/{test}")
async def test(test: str):
	return {"test": test}

@app.get("/user")
async def get_users():
	data = get_user()
	return jsonable_encoder(data)

#if __name__ == "__main__":
#	uvicorn.run(app, host="127.0.0.1", port=8000)

