from .db import db, environment, SCHEMA, add_prefix_for_prod


class ShoppingCart(db.Model):
    __tablename__ = 'shoppingcarts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("users.id")))
    restaurantId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("restaurants.id")))
    total = db.Column(db.Float(), nullable=False)

    user = db.relationship("User", back_populates="shoppingCart")

    restaurant = db.relationship("Restaurant", back_populates="shoppingCart")

    shoppingCartItems = db.relationship("ShoppingCartItem", back_populates="shoppingCart")


def to_dict(self):
    return {
        "id": self.id,
        "userId": self.userId,
        "restaurantId": self.restaurantId,
        "total": self.total
    }
