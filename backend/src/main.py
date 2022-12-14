from typing import Optional, Union, List
from sqlmodel import Field, SQLModel, Session, create_engine, select, JSON, Column
from fastapi import FastAPI, WebSocket
from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import uvicorn
import datetime
#import pymysql
#import MySQLdb


class Artiste(SQLModel, table=True, extend_existing=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	nom: str
	prenom: str
	nom_artiste: str

class Album(SQLModel, table=True, extend_existing=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	titre: str
	genre: str
	annee_sortie: str
	id_artiste: int
	prix: float
	photo: str
	nom_artiste: str

class Chanson(SQLModel, table=True, extend_existing=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	titre: str
	id_album: int
	duree: float

class User(SQLModel, table=True, extend_existing=True):
	user_id: Optional[int] = Field(default=None, primary_key=True)
	user_type: str
	nom: str
	prenom: str
	login: str
	password: str

class Panier(SQLModel, table=True, extend_existing=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	id_user: int
	id_albums: int
	quantite: int
	montant_total: float

class Historique(SQLModel, table=True, extend_existing=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	id_user: int
	montant: int
	id_albums: List[int] = Field(sa_column=Column(JSON))
	quantite: List[int] = Field(sa_column=Column(JSON))

engine = create_engine("sqlite:///database.db")
SQLModel.metadata.clear()
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
	panier1 = Panier(id_user=1, id_albums=1, montant_total=100)
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

def get_user(login, password):
	with Session(engine) as session:
		route = select(User).where(User.login == login).where(User.password == password)
		res = session.exec(route)
		users = res.all()
		for user in users:
			print(user)
		return users

def get_users_list():
	with Session(engine) as session:
		route = select(User)
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

def get_user_by_id_user(id):
	with Session(engine) as session:
		route = select(User).where(User.user_id == id)
		res = session.exec(route)
		users = res.one()
		return users

def is_admin(id_user):
	user = get_user_by_id(id_user)
	if(user.user_type=="admin"):
		return True
	return False

def create_user(nom_u, prenom_u, login_u, password_u):
	new_user = User(nom=nom_u, prenom=prenom_u, login=login_u, password=password_u)
	with Session(engine) as session:
		data = get_users_list()
		for user in data:
			if user.login == new_user.login :
				return {"msg" : "Ce login existe déjà."}
		session.add(new_user)
		session.commit()
		return {"msg" : "L'utilisateur "+ login_u+" a bien été créé"}
'''
def ajouter_au_panier(id_user, id_album):
	panier = get_panier(id_user)
	with Session(engine) as session:
		for album in panier.id_album:
			if id_album == album.id :
				return {"msg" : "Cet album a déjà été ajouté"}
		session.add(new_user)
		session.commit()
		return {"msg" : "L'album "+ +" a bien été créé"}
'''
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

def insert_panier(id_albums, montant_total, qte, id_user):
	new_panier = Panier(id_albums=id_albums, montant_total=montant_total, id_user=id_user, quantite=qte)
	with Session(engine) as session:
		data = get_paniers()
		for panier in data:
			if panier.id_albums == new_panier.id_albums and panier.id_user == new_panier.id_user:
				return {"msg": "Vous avez ajouté cet album dans votre panier"}
		session.add(new_panier)
		session.commit()
		return {"msg": "L'album est ajouté dans votre panier"}

def supprimer_album_panier(id_user, id_album):
	with Session(engine) as session:
		panier = get_panier_by_user_album(id_user, id_album)
		session.delete(panier)
		session.commit()
		return {"msg" : "L'album a bien été supprimé" }

def get_panier_by_user_album(id_user, id_album):
	with Session(engine) as session:
		route = select(Panier).where(Panier.id_user == id_user).where(Panier.id_albums == id_album)
		res = session.exec(route)
		paniers = res.one()
		for panier in paniers:
			print(panier)
		return paniers

def get_historique():
	with Session(engine) as session:
		route = select(Historique)
		res = session.exec(route)
		data = res.all()
		return data

def ajouter_paiement(id_user, montant_total, id_albums, qte):
	liste_alb = id_albums.split("-")
	liste_qte = qte.split("-")
	nv_paiement = Historique(id_user=id_user, montant=montant_total, id_albums=liste_alb, quantite=liste_qte)
	with Session(engine) as session:
		route = select(Historique)
		res = session.exec(route)
		data = res.all()
		session.add(nv_paiement)
		session.commit()
		return {"msg": "Votre paiement a été accepté"}

#creer_musique()
#get_artistes()
#get_albums_by_artiste(1)
#get_songs_by_album(1)
#creer_panier()

#RECUPERER MUSIQUES
app = FastAPI(title="Magasin de vinyles")

#origins = ["*"]
origins = [
	"http://localhost",
	"http://127.0.0.1:8000", 
	"https://127.0.0.1:8000",
	"ws://127.0.0.1:8000"
]

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

#affiche les informations d'un album
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
	message = {"msg : Connexion réussie. Bienvenue "}
	if not data:
		message = {"msg" : "Mauvais login ou mot de passe. Veuillez réessayer."}
	return message, jsonable_encoder(data)

#affiche la liste de tous les utilisateurs
@app.get("/users/")
async def get_all_users():
	data = get_users_list()
	return jsonable_encoder(data)

#inscription d'un nouvel utilisateur en spécifiant ses nom, prénom, login et mot de passe
@app.get("/signin/{n}_{p}_{l}_{m}")
async def sign_in(n, p, l, m):
	return create_user(n, p, l, m)
'''
@app.post("/new")
async def create_new_user(nom: str, prenom: str, login: str, pswd:str) :
	return {"mfg" :"khsdf"}
'''

#supprime un album dans le panier d'un utilisateur en fonction de son identifiant et de l'id de l'album
@app.get("/supprimer_panier/{user}_{album}")
async def delete_album_by_id_in_panier(user, album):
	return supprimer_album_panier(user, album)

#ajoute un album dans le panier d'un utilisateur en spécifiant l'id d'utilisateur, l'id et le montant de l'album
@app.get("/ajouter_album_panier/{user}_{album}_{qte}_{montant}")
async def add_album_panier(user, album, montant, qte): 
	return insert_panier(album, montant, qte, user)

#ajoute un paiement à l'historique
@app.get("/paiement/{user}_{albums}_{qte}_{montant}")
async def add_paiement(user, montant, albums, qte): 
	return ajouter_paiement(user, montant, albums, qte)

@app.get("/historique")
async def get_hist(): 
	return get_historique()

#test de l'api
@app.get("/test/{test}")
async def test(test: str):
	return {"test": test}

#test websocket
'''
html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:8000/ws");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@app.get("/")
async def get():
    return HTMLResponse(html)

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
	await ws.accept()
	while True:
		data = await ws.receive_text()
		await ws.send_text(f"Message : {data}")
'''
if __name__ == "__main__":
	#uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
	uvicorn.run(app, host="127.0.0.1", port=8000)