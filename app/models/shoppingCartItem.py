from .db import db


class ShoppingCartItem(db.Model):
    __tablename__ = 'shoppingCartItems'

    id = db.Column(db.Integer(), primary_key=True)
    cartId = db.Column(db.Integer(), nullable=False)
    menuItemId = db.Column(db.Integer(), nullable=False)
    itemQuantity = db.Column(db.Integer, nullable=False)

    menuitem = db.relationship("MenuItems", back_populates="shoppingcartitems")

    def to_dict(self):
        return {
            "id": self.id,
            "cartId": self.cartId,
            "menuItemId": self.menuItemId,
            "itemQuantity": self.itemQuantity,
        }