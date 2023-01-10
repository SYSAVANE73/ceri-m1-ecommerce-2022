from typing import Optional, Union, List
from sqlmodel import Field, SQLModel, Session, create_engine, select, JSON, Column
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from algoliasearch.search_client import SearchClient
import uvicorn
import datetime
import MySQLdb
import sqlalchemy
import os

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
	stock: int

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
	statut: str

class Panier(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	id_user: int
	id_albums: int
	montant_total: float
	quantite: int

class Favoris(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	id_albums: int
	id_user: int

class Historique(SQLModel, table=True, extend_existing=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	id_user: int
	id_albums: List[str] = Field(sa_column=Column(JSON))
	nom_albums: List[str] = Field(sa_column=Column(JSON))
	quantite: List[int] = Field(sa_column=Column(JSON))
	montant: float
	date: str
	statut: str

#connect_string = "mysql+pymysql://root:root@localhost:3306/songs"

#config = Config(".env")

"""
user_name = config("user_name", cast=str)
password = config("password", cast=str)
host = config("host", cast=str)
database_name = config("database_name", cast=str)
"""

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
DATABASE_USERNAME = os.environ.get('DATABASE_USERNAME')
DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')
DATABASE_ADDRESS = os.environ.get('DATABASE_ADDRESS')
DATABASE_NAME = os.environ.get('DATABASE_NAME')

connection_name = 'ceri-m1-ecommerce-2022:europe-west1:mysql-primary'
"""
DATABASE = 'mysql://%s:%s@%s/%s?charset=utf8' % (
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_ADDRESS,
    DATABASE_NAME,
)
"""
DATABASE = sqlalchemy.engine.url.URL.create(
    drivername="mysql+pymysql",
    username=DATABASE_USERNAME,
    password=DATABASE_PASSWORD,
    database=DATABASE_NAME,
    query={"unix_socket": "{}/{}".format("/cloudsql", connection_name)},
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
		#for artiste in artistes:
			#print(artiste)
		return artistes

def get_songs_by_album(albumId):
	with Session(engine) as session:
		route = select(Chanson).where(Chanson.id_album == albumId)
		res = session.exec(route)
		album = res.all()
		#for chanson in album:
			#print(chanson)
		return album

def get_albums_by_artiste(artisteId):
	with Session(engine) as session:
		route = select(Album).where(Album.artiste_id == artisteId)
		res = session.exec(route)
		albums = res.all()
		#for album in albums:
			#print(album)
		return albums

def get_albums():
	with Session(engine) as session:
		route = select(Album)
		res = session.exec(route)
		albums = res.all()
		return albums

def get_albums_by_id(id_album):
	with Session(engine) as session:
		route = select(Album).where(Album.id == id_album)
		res = session.exec(route)
		albums = res.all()
		return albums

def get_user(login, password):
    with Session(engine) as session:
        route = select(User).where(User.login == login).where(User.password == password)
        res = session.exec(route)
        users = res.all()
        return users

#retourne un album
def get_panier(id):
	with Session(engine) as session:
		route = select(Panier).where(Panier.id_user == id)
		res = session.exec(route)
		paniers = res.all()
		return paniers

#retourne la liste de tous les utilisateurs
def get_paniers():
	with Session(engine) as session:
		route = select(Panier)
		res = session.exec(route)
		paniers = res.all()
		return paniers

#retourne tous les utilisateurs
def get_users_list():
    with Session(engine) as session:
        route = select(User)
        res = session.exec(route)
        users = res.all()
        return users

#trouver un utilisateur par son login
def get_user_by_id(login):
	with Session(engine) as session:
		route = select(User).where(User.login == login)
		res = session.exec(route)
		users = res.all()
		return users

#modifier le profil d'un utilisateur 
def update_user(old_login, new_name, new_fname, new_login):
	users = get_users_list()
	with Session(engine) as session:
		route = select(User).where(User.login == old_login)
		res = session.exec(route)
		user = res.one()
		new_log_usr = get_user_by_id(new_login)

		for u in users:
			if(u.login == new_login):
				return {"msg": "Ce login existe déjà"}
		user.nom = new_name
		user.prenom = new_fname
		user.login = new_login
		session.add(user)
		session.commit()
		return {"msg": "L'utilisateur a bien été modifié'"}

#trouver un utilisateur par son identifiant unique
def get_user_by_id_user(id):
	with Session(engine) as session:
		route = select(User).where(User.user_id == id)
		res = session.exec(route)
		users = res.one()
		return users

def get_status_by_login(login):
	with Session(engine) as session:
		route = select(User.user_type).where(User.login == login)
		res = session.exec(route)
		user = res.one()
		return user

def is_admin(id_user):
	user = get_user_by_id(id_user)
	if(user.user_type=="admin"):
		return True
	return False

def create_user(nom_u, prenom_u, login_u, password_u, statut_u):
    new_user = User(nom=nom_u, prenom=prenom_u, login=login_u, password=password_u, statut=statut_u)
    with Session(engine) as session:
        data = get_users_list()
        for user in data:
            if user.login == new_user.login :
                return {"msg" : "Ce login existe déjà."}
        session.add(new_user)
        session.commit()
        return {"msg" : "L'utilisateur "+ login_u+" a bien été créé"}

#inserer un artiste dans la base de donnée
def insert_artiste(nom, prenom, nom_artiste):
	new_artiste = Artiste(nom=nom, prenom=prenom, nom_artiste=nom_artiste)
	with Session(engine) as session:
		data = get_artistes()
		for artiste in data:
			if artiste.nom == new_artiste.nom and artiste.prenom == new_artiste.prenom:
				return {"msg": "Cet artiste existe déjà dans la base"}
		session.add(new_artiste)
		session.commit()
		return {"msg": "Artiste ajouter avec succès"}
"""
	Favoris
"""
def get_favoris():
	with Session(engine) as session:
		route = select(Favoris)
		res = session.exec(route)
		favoris = res.all()
		for favori in favoris:
			print(favori)
		return favoris

def get_favori(id):
	with Session(engine) as session:
		route = select(Favoris).where(Favoris.id_user == id)
		res = session.exec(route)
		favoris = res.all()
		for favori in favoris:
			print(favori)
		return favoris

def insert_panier(id_albums, montant_total, id_user, quantite):
	new_panier = Panier(id_albums=id_albums, montant_total=montant_total, id_user=id_user, quantite=quantite)
	with Session(engine) as session:
		data = get_paniers()
		for panier in data:
			if panier.id_albums == new_panier.id_albums and panier.id_user == new_panier.id_user:
				return {"msg": "Vous avez ajouté cet album dans votre panier"}
		session.add(new_panier)
		session.commit()
		return {"msg": "L'album est ajouté dans votre panier"}

def get_panier_by_user_album(id_user, id_album):
	with Session(engine) as session:
		route = select(Panier).where(Panier.id_user == id_user).where(Panier.id_albums == id_album)
		res = session.exec(route)
		paniers = res.one()
		return paniers

def get_artiste_by_id(id):
	with Session(engine) as session:
		route = select(Artiste).where(Artiste.id == id)
		res = session.exec(route)
		artiste = res.all()
		return artiste[0]

def insert_album(titre, genre, annee, id_artiste, prix, photo, nom_artiste, stock):
	alb = Album(titre=titre, genre=genre, annee_sortie=annee, id_artiste=id_artiste, prix=prix, photo="https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", nom_artiste=nom_artiste, stock=stock)
	with Session(engine) as session:
		session.add(alb)
		session.commit()
		obj_alb = {"objectID": alb.id,"annee_sortie":annee,"id":alb.id,"prix":prix,"nom_artiste":nom_artiste,"stock":stock,"titre":titre,"genre":genre,"id_artiste":id_artiste,"photo":"https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg"}
		search_index.save_object(obj_alb).wait()
		return alb

def insert_chanson(titre, id_album, duree):
	ch = Chanson(titre=titre, id_album=id_album, duree=duree)
	with Session(engine) as session:
		session.add(ch)
		session.commit()
		return ch


def supprimer_album_panier(id_user, id_album):
	with Session(engine) as session:
		panier = get_panier_by_user_album(id_user, id_album)
		session.delete(panier)
		session.commit()
		return {"msg" : "L'album a bien été supprimé" }


#Favoris
def insert_favoris(id_albums, id_user):
	new_favori = Favoris(id_albums=id_albums, id_user=id_user)
	with Session(engine) as session:
		data = get_favoris()
		for favori in data:
			if favori.id_albums == new_favori.id_albums and favori.id_user == new_favori.id_user:
				return {"msg": "Vous avez ajout cet album dans vos favoris"}
		session.add(new_favori)
		session.commit()
		return {"msg": "L'album est ajouter dans liste de favoris"}

def get_favoris_by_user_album(id_album, id_user):
	with Session(engine) as session:
		route = select(Favoris).where(Favoris.id_user == id_user).where(Favoris.id_albums == id_album)
		res = session.exec(route)
		favoris = res.one()
		return favoris

def supprimer_album_favoris(id_album, id_user):
	with Session(engine) as session:
		favoris = get_favoris_by_user_album(id_album, id_user)
		session.delete(favoris)
		session.commit()
		return {"msg" : "L'album a bien été supprimé dans votre favoris" }

#Gestion du paiement
#modifier la quantité d'album restante en stock
def update_qte_album(id_album, qte):
	with Session(engine) as session:
		route = select(Album).where(Album.id == id_album)
		res = session.exec(route)
		album = res.one()
		album.stock = album.stock - qte
		session.add(album)
		session.commit()
		return {"msg": "Le stock a été modifié"}

#pour ajoiuter la quantité d'un album
def update_ajouter_qte_album(id_album, qte):
	with Session(engine) as session:
		route = select(Album).where(Album.id == id_album)
		res = session.exec(route)
		album = res.one()
		album.stock += qte
		session.add(album)
		session.commit()
		return {"msg": "Le stock a été modifié"}

#liste l'historique de tous les paiements
def get_historique():
	with Session(engine) as session:
		route = select(Historique)
		res = session.exec(route)
		data = res.all()
		return data

#liste l'historique de tous les paiements
def get_historique_user(id):
	with Session(engine) as session:
		route = select(Historique).where(Historique.id_user == id)
		res = session.exec(route)
		data = res.all()
		return data

#Ajouter le paiement dans l'historique
def ajouter_paiement(id_user, id_albums, albums, qte, mtt, date):
	statut="En cours de vérification"
	liste_alb_id = id_albums.split("-")
	liste_alb = albums.split("-")
	liste_qte = qte.split("-")
	nv_paiement = Historique(id_user=id_user, id_albums=liste_alb_id, nom_albums=liste_alb, quantite=liste_qte, montant=mtt, date=date, statut=statut)
	with Session(engine) as session:
		session.add(nv_paiement)
		session.commit()
		return {"msg": "Votre paiement a été accepté"}
		

#creer_musique()
#get_artistes()
#get_albums_by_artiste(1)
#get_songs_by_album(1)

#ALGOLIA AJOUT A l'INDEX
#app ID, admin API key
clientAlgolia = SearchClient.create("F0PFIIXL0Z", "4ab046441e6f0f88f3e50ed3794a70f5")

search_index = clientAlgolia.init_index("album_index")
all_albums = get_albums()
obj_id=1
for album in all_albums:
	obj_usr = get_artiste_by_id(album.id_artiste)
	obj_alb = {"objectID": obj_id,"annee_sortie":album.annee_sortie,"id":album.id,"prix":album.prix,"nom_artiste":obj_usr.nom_artiste,"stock":album.stock,"titre":album.titre,"genre":album.genre,"id_artiste":album.id_artiste,"photo":album.photo}
	obj_id +=1
	search_index.save_object(obj_alb).wait()


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

#################
#renvoie tous les artistes
@app.get("/")
async def index():
	data = get_artistes()
	return jsonable_encoder(data)

#insertion d'un artiste dans la base
@app.get("/insert_artiste/{nom}/{prenom}/{nom_artiste}")
async def insert_into_artiste(nom: str, prenom: str, nom_artiste: str):
	return insert_artiste(nom, prenom, nom_artiste)

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

#verification de la connexion
@app.get("/login/{login}/{pwd}")
async def get_users(login: str, pwd: str):
	data = get_user(login, pwd)
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

@app.get("/signin/{n}_{p}_{l}_{m}_{s}")
async def sign_in(n, p, l, m, s):
    return create_user(n, p, l, m, s)

#renvoie le statut d'un utilisateur (admin vs user)
@app.get("/user_statut/{login}")
async def get_status(login):
	data = get_users_list()
	return get_status_by_login(login)

#modifie le profil d'un utilisateur
@app.get("/updateUser/{old_login}/{new_name}/{new_fname}/{new_login}")
async def update_usr(old_login, new_name, new_fname, new_login):
	return update_user(old_login, new_name, new_fname, new_login)


#insertion d'un album dans le panier
@app.get("/insertPanier/{id_user}/{id_album}/{montant}/{quantite}")
async def insert_into_panier(id_user: int, id_album: int, montant: int, quantite: int):
	return insert_panier(id_album, montant, id_user, quantite)

#supression d'un album dans le panier
@app.get("/supprimer_panier/{user}_{album}")
async def delete_album_by_id_in_panier(user, album):
	return supprimer_album_panier(user, album)

#affiche le panier d'un utilisateur
@app.get("/favoris/{id_user}")
async def get_favoris_by_id(id_user: int):
	data = get_favori(id_user)
	return jsonable_encoder(data)

#insertion d'un album dans le favori
@app.get("/insertFavoris/{id_album}/{id_user}")
async def insert_into_favoris(id_album: int, id_user: int):
	return insert_favoris(id_album, id_user)

#supression d'un album dans favoris
@app.get("/supprimer_favoris/{album}_{user}")
async def delete_album_by_id_in_favoris(album, user):
	return supprimer_album_favoris(album, user)

#modifier le stock d'album
@app.get("/modifier_stock_album/{id_album}_{qte}")
async def update_stock(id_album: int, qte: int):
	data = update_qte_album(id_album, qte)
	return jsonable_encoder(data)

#modifier / ajout d'albums dans le stock
@app.get("/ajout_stock_album/{id_album}_{qte}")
async def update_stock2(id_album: int, qte: int):
	return update_ajouter_qte_album(id_album, qte)

#test de l'api
@app.get("/test/{test}")
async def test(test: str):
	return {"test": test}

#ajoute un paiement à l'historique
@app.get("/paiement/{id_user}/{id_albums}/{albums}/{qte}/{montant}/{date}")
async def add_paiement(id_user, id_albums, albums, qte, montant, date): 
	return ajouter_paiement(id_user, id_albums, albums, qte, montant, date)

#Afficher l'historique de tous les paiment
@app.get("/historique")
async def get_hist(): 
	return get_historique()

#Afficher l'historique de paiement de utilisateur
@app.get("/historique_user/{id_user}")
async def get_hist_user(id_user): 
	return get_historique_user(id_user)

#Recherche avec algolia
@app.get("/search/{recherche}")
async def get_search(recherche):
	results = search_index.search(recherche, {'attributesToRetrieve': [
        'titre',
        'nom_artiste'
    ]})
	return {"msg": str(results["nbHits"]) +" résultats trouvés"}, jsonable_encoder(results["hits"])


#if __name__ == "__main__":
#	uvicorn.run(app, host="127.0.0.1", port=8000)

