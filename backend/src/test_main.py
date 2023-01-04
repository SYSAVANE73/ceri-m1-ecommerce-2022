from fastapi.testclient import TestClient
#from fastapi.encoders import jsonable_encoder
from .main import app, engine, get_albums_by_id, get_albums_by_artiste

client = TestClient(app)

def test_connection_api():
	resp = client.get("/test/test")
	assert resp.status_code == 200
	assert resp.json() == {"test": "test"}

def test_read_album():#print album n°4
	resp = client.get("/getAlbum/4")
	album = get_albums_by_id(4)
	assert resp.status_code == 200
	#assert resp.json() == jsonable_encoder(album)
	assert resp.json() == [{
		"annee_sortie": "2018", 
		"id_artiste": 3, 
		"genre": "HPop, RnB contemporain, Trap", 
		"id": 4, 
		"photo": "https://m.media-amazon.com/images/I/81FH-xfuK5L._SL1500_.jpg", 
		"prix": 50.00, 
		"titre": "Sweetener",
		"nom_artiste": "Ariana Grande"}]

def test_read_albums_artiste():#print all albums for an artist
	resp = client.get("/artiste/3")

	assert resp.status_code == 200
	#assert resp.json() == jsonable_encoder(get_albums_by_artiste(3))
	assert resp.json() == [{
		"annee_sortie": "2018", 
		"id_artiste": 3, 
		"genre": "HPop, RnB contemporain, Trap", 
		"id": 4, 
		"photo": "https://m.media-amazon.com/images/I/81FH-xfuK5L._SL1500_.jpg", 
		"prix": 50.00, 
		"titre": "Sweetener",
		"nom_artiste": "Ariana Grande"},]

def test_artistes():
	resp = client.get("/")
	assert resp.status_code == 200
	assert resp.json() == [
		{"id": 1, "nom":"Sedraïa","prenom":"Adila","nom_artiste":"Indila"}, 
		{"id": 2, "nom":"Maitre","prenom":"Gims","nom_artiste":"Maitre Gims"},
		{"id": 3, "nom":"Ariana","prenom":"Grande","nom_artiste":"Ariana Grande"}, 
		{"id": 4, "nom":"Black","prenom":"Mesrime","nom_artiste":"Black M"}, 
		{"id": 5, "nom":"Rihanna","prenom":"R","nom_artiste":"Rihanna"}, 
		{"id": 6, "nom":"Aya","prenom":"Nakamura","nom_artiste":"Aya Nakamura"},
	]

def test_get_songs_by_album():
	resp = client.get("album/3")
	assert resp.status_code == 200
	assert resp.json() == [
		{"id": 5, "titre": "Immortel", "id_album": 3, "duree": 2.27}, 
		{"id": 6, "titre": "Coté Noir", "id_album": 3, "duree": 3.51}, 
		{"id": 7, "titre": "Oats", "id_album": 3, "duree": 2.56}, 
		{"id": 8, "titre": "Oro Jackson", "id_album": 3, "duree": 3.00},
	]
#def test_unknown_album():
#	resp = client.get("/album/")