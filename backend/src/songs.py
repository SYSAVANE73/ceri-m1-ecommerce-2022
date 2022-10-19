from typing import Optional

from sqlmodel import Field, SQLModel
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


