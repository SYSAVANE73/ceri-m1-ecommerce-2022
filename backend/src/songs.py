from typing import Optional
from sqlmodel import Field, SQLModel, Session, create_engine, select
from fastapi import FastAPI
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

#ROUTES
def get_artistes():
	with Session(engine) as session:
		route = select(Artiste)
		artistes = session.exec(route)
		#for artiste in artistes:
		#	print(artiste)
def get_songs_by_album(albumId):
	with Session(engine) as session:
		route = select(Chanson).where(Chanson.num_album == albumId)
		album = session.exec(route)
		#for chanson in album:
		#	print(chanson)

def get_albums_by_artiste(artisteId):
	with Session(engine) as session:
		route = select(Album).where(Album.artiste_id == artisteId)
		albums = session.exec(route)
		#for album in albums:
		#	print(album)

#RECUPERER MUSIQUES
app = FastAPI(title="Magasin de vinyles")
@app.get("/")
async def index():
	return {"message" : "accueil"}
if __name__ == "__main__":
	uvicorn.run(app, host="127.0.0.1", port=8000)