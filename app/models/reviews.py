from .db import db


class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer(), primary_key=True)
  userId = db.Column(db.Integer(), db.foreignKey("users.id"))
  restaurantId = db.Column(db.Integer(), db.foreignKey("restaurants.id"))
  review = db.Column(db.String(), nullable=False)
  stars = db.Column(db.Integer(), nullable=False)

  user = db.relationship("User", back_populates="reviews")
  restaurant = db.relationship("Restaurant", back_populates="reviews")

def to_dict(self):
  return {
    "id": self.id,
    "userId": self.userId,
    "restaurantId": self.restaurantId,
    "reviews": self.reviews,
    "stars": self.stars
  }
