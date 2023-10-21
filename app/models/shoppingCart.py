from .db import db, environment, SCHEMA, add_prefix_for_prod


class ShoppingCart(db.Model):
    __tablename__ = 'shoppingcarts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    restaurantId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("restaurants.id")))
    total = db.Column(db.DECIMAL(6,2), nullable=False)

    user = db.relationship("User", back_populates="shoppingCart")

    restaurant = db.relationship("Restaurant", back_populates="shoppingCart")

    shoppingCartItems = db.relationship(
        "ShoppingCartItem", back_populates="shoppingCart", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "restaurantId": self.restaurantId,
            "total": self.total
        }
