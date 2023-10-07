from .db import db


class ShoppingCart(db.Model):
  __tablename__ = 'shoppingCarts'

  id = db.Column(db.Integer(), primary_key=True)
  userId = db.Column(db.Integer(), db.foreignKey("users.id"))
  restaurantId = db.Column(db.Integer(), db.foreignKey("restaurants.id"))
  total = db.Column(db.Float(), nullable=False)

  user = db.relationship("User", back_populates="shoppingCarts")
  restaurant = db.relationship("Restaurant", back_populates="shoppingCarts")

def to_dict(self):
  return {
    "id": self.id,
    "userId": self.userId,
    "restaurantId": self.restaurantId,
    "total": self.total
  }
