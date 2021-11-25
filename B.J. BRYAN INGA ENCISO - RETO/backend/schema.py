from typing import Optional
from pydantic import BaseModel
import datetime  as _dt
from datetime import datetime, date

class PersonalBase(BaseModel):
    nombre: str
    apellidos: str
    edad: int
    fecha_de_nacimiento: Optional[date]

class PersonalAdd(PersonalBase):
    class Config:
        orm_mode = True

class Personals(PersonalAdd):
    id: int
    class Config:
        orm_mode = True

class UpdatePersonal(PersonalBase):
    class Config:
        orm_mode = True
