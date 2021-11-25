from sqlalchemy import String, Boolean, Integer, DateTime, Column, Date
import datetime  as _dt
from db import Base

class Personal(Base):
    __tablename__ = "personal"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True, nullable=False)
    nombre = Column(String, index=True, nullable=False)
    apellidos = Column(String, index=True, nullable=False)
    edad = Column(Integer, index=True, nullable=False)
    fecha_de_nacimiento = Column(Date, index=True, nullable=False)
    fecha_creado = Column(DateTime, index=True, default=_dt.datetime.utcnow, nullable=False)