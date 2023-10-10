from .db import db, environment, SCHEMA, add_prefix_for_prod


class ShoppingCartItem(db.Model):
    __tablename__ = 'shoppingCartItems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    cartId = db.Column(db.Integer(), nullable=False)
    menuItemId = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod(
        "menuItems.id")), nullable=False)
    itemQuantity = db.Column(db.Integer, nullable=False)

    menuItem = db.relationship("MenuItem", back_populates="shoppingCartItems")

    shoppingCart = db.relationship(
        "ShoppingCart", back_populates="shoppingCartItems")

    def to_dict(self):
        return {
            "id": self.id,
            "cartId": self.cartId,
            "menuItemId": self.menuItemId,
            "itemQuantity": self.itemQuantity,
        }
