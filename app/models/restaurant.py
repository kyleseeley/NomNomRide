from .db import db


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column()
    ownerId = db.Column(db.Integer)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float())
    lng = db.Column(db.Float())
    name = db.Column(db.String(60), nullable=False)
    type = db.Column(db.String(60), nullable=False)
    image = db.Column()
