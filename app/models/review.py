from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("users.id")))
    restaurantId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("restaurants.id")))
    review = db.Column(db.String(), nullable=False)
    stars = db.Column(db.Integer(), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="reviews")

    restaurant = db.relationship("Restaurant", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "restaurantId": self.restaurantId,
            "review": self.review,
            "stars": self.stars,
            "createdAt": self.createdAt,
            'restaurantName': self.restaurant.to_dict()['name']
        }
