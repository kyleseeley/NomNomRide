from .db import db


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column()
    ownerId = db.Column(db.Integer)
