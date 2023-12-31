from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class MenuItem(db.Model):
    __tablename__ = 'menuitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurantId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("restaurants.id")))
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(60), nullable=False)
    price = db.Column(db.DECIMAL(6,2), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String())
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    restaurant = db.relationship("Restaurant", back_populates="menuItems")

    shoppingCartItems = db.relationship(
        "ShoppingCartItem", back_populates="menuItem", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "restaurantId": self.restaurantId,
            "name": self.name,
            "type": self.type,
            "price": self.price,
            "description":self.description,
            "image": self.image
        }
