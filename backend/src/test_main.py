from fastapi.testclient import TestClient
from fastapi.encoders import jsonable_encoder
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
	assert resp.json() == [{"titre":"Sweetener",
	"genre":"HPop, RnB contemporain, Trap",
	"id_artiste":3,
	"photo":"https://m.media-amazon.com/images/I/81FH-xfuK5L._SL1500_.jpg",
	"nom_artiste":"Ariana Grande",
	"id":4,
	"annee_sortie":"2018",
	"prix":50.0,"stock":100},]

def test_read_albums_artiste():#print all albums for an artist
	resp = client.get("/artiste/3")

	assert resp.status_code == 200
	#assert resp.json() == jsonable_encoder(get_albums_by_artiste(3))
	assert resp.json() == [{"titre":"Sweetener",
		"genre":"HPop, RnB contemporain, Trap",
		"id_artiste":3,
		"photo":"https://m.media-amazon.com/images/I/81FH-xfuK5L._SL1500_.jpg",
		"nom_artiste":"Ariana Grande",
		"id":4,
		"annee_sortie":"2018",
		"prix":50.0,
		"stock":100},]

def test_artistes():
	resp = client.get("/")
	assert resp.status_code == 200
	assert resp.json() == [{"nom_artiste":"Indila","nom":"Sedraïa","prenom":"Adila","id":1},
	{"nom_artiste":"Maitre Gims","nom":"Maitre","prenom":"Gims","id":2},
	{"nom_artiste":"Ariana Grande","nom":"Ariana","prenom":"Grande","id":3},
	{"nom_artiste":"Black M","nom":"Black","prenom":"Mesrime","id":4},
	{"nom_artiste":"Rihanna","nom":"Rihanna","prenom":"R","id":5},
	{"nom_artiste":"Aya Nakamura","nom":"Aya","prenom":"Nakamura","id":6},
	{"nom_artiste":"One Ok Rock","nom":"One","prenom":"Ok Rock","id":7},]

def test_get_songs_by_album():
	resp = client.get("album/3")
	assert resp.status_code == 200
	assert resp.json() == [{"id_album":3,"duree":2.27,"id":5,"titre":"Immortel"},
		{"id_album":3,"duree":3.51,"id":6,"titre":"Coté Noir"},
		{"id_album":3,"duree":2.56,"id":7,"titre":"Oats"},
		{"id_album":3,"duree":3.0,"id":8,"titre":"Oro Jackson"},]
#def test_unknown_album():
#	resp = client.get("/album/")