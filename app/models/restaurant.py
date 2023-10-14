from .db import db, environment, SCHEMA, add_prefix_for_prod


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    ownerId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float())
    lng = db.Column(db.Float())
    name = db.Column(db.String(60), nullable=False)
    type = db.Column(db.String(60), nullable=False)
    image = db.Column(db.String())
    starRating = db.Column(db.Float())
    numReviews = db.Column(db.Integer())

    owner = db.relationship("User", back_populates="restaurants")

    menuItems = db.relationship("MenuItem", back_populates="restaurant")

    reviews = db.relationship("Review", back_populates="restaurant")

    shoppingCart = db.relationship("ShoppingCart", back_populates="restaurant")

    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.ownerId,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "lat": self.lat,
            "lng": self.lng,
            "name": self.name,
            "type": self.type,
            "image": self.image,
            "starRating": self.starRating,
            "numReviews": self.numReviews,
        }
