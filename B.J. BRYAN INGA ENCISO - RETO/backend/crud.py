from sqlalchemy.orm import Session
import model
import schema


def get_personals(db: Session):
    return db.query(model.Personal).all()

def get_personal_by_id(sl_id: int, db: Session):
    return db.query(model.Personal).filter(model.Personal.id == sl_id).first()

def add_personal(db: Session, personal: schema.PersonalAdd):

    detalle = model.Personal(
        nombre=personal.nombre,
        apellidos=personal.apellidos,
        edad=personal.edad,
        fecha_de_nacimiento=personal.fecha_de_nacimiento
    )

    db.add(detalle)
    db.commit()
    db.refresh(detalle)
    return model.Personal(**personal.dict())

def update_personal(db: Session, sl_id: int, details: schema.UpdatePersonal):
    db.query(model.Personal).filter(model.Personal.id == sl_id).update(vars(details))
    db.commit()
    return db.query(model.Personal).filter(model.Personal.id == sl_id).first()


def delete_personal_by_id(db: Session, sl_id: int):
    todo = db.query(model.Personal).filter(model.Personal.id == sl_id).first()
    db.delete(todo)
    db.commit()
    