from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from db import SessionLocal, engine

from typing import List
import crud
import model
import schema

model.Base.metadata.create_all(bind=engine)

app = FastAPI(title='BJ Bryan Inga Enciso',
            description='BJ Bryan Inga Enciso / 75839096',
            version='1.0.1')

origins = [
    "http://localhost:8000",
    "localhost:8000",
    "http://localhost:4200",
    "localhost:4200",
    "http://localhost:4200/",
    "localhost:4200/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/', response_model=List[schema.Personals])
async def index(db: Session = Depends(get_db)):
    personals = crud.get_personals(db=db)
    return personals


@app.get('/personal', response_model=List[schema.Personals])
async def get_personals(db: Session = Depends(get_db)):
    personals = crud.get_personals(db=db)
    return personals

@app.get('/personal/{sl_id}', response_model=schema.Personals)
async def f_get_personalsby_id(sl_id: str, db: Session = Depends(get_db)): 
    return crud.get_personal_by_id(db=db, sl_id=sl_id)


@app.post('/add_new_personal', response_model=schema.PersonalAdd)
async def add_new_personal(personal: schema.PersonalAdd, db: Session = Depends(get_db)):
    return crud.add_personal(db=db, personal=personal)

@app.get('/delete_personal_by_id/{sl_id}')
def delete_personal_by_id(sl_id: int, db: Session = Depends(get_db)):
    crud.delete_personal_by_id(db=db, sl_id=sl_id)
    return {"detail": "TODO Deleted"}


@app.put('/update_personal_details/{sl_id}', response_model=schema.UpdatePersonal)
async def update_personal_details(sl_id: int, update_param: schema.UpdatePersonal, db: Session = Depends(get_db)):
    details = crud.get_personal_by_id(db=db, sl_id=sl_id)
    if not details:
        raise HTTPException(status_code=404, detail=f"No se encuentra id para actualizar")

    return crud.update_personal(db=db, details=update_param, sl_id=sl_id)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)