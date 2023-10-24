from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


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
    image = db.Column(db.String(), nullable=False)
    starRating = db.Column(db.Float())
    numReviews = db.Column(db.Integer())
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = db.relationship("User", back_populates="restaurants")

    menuItems = db.relationship("MenuItem", back_populates="restaurant", cascade="all, delete-orphan")

    reviews = db.relationship("Review", back_populates="restaurant", cascade="all, delete-orphan")

    shoppingCart = db.relationship("ShoppingCart", back_populates="restaurant", cascade="all, delete-orphan")

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

    def get_menuItems(self):
        return {
            'menuItems': [menuItem.to_dict() for menuItem in self.menuItems]
        }

    def get_reviews(self):
        return {
            'reviews': [review.to_dict() for review in self.reviews]
        }
