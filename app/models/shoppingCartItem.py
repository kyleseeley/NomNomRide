from .db import db, environment, SCHEMA, add_prefix_for_prod


class ShoppingCartItem(db.Model):
    __tablename__ = 'shoppingcartitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    cartId = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("shoppingcarts.id")), nullable=False)
    menuItemId = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod(
        "menuitems.id")), nullable=False)
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

    def get_item_details(self):
        menuItem = self.menuItem.to_dict()
        return {
            "name": menuItem['name'],
            "price": menuItem['price'],
            "description": menuItem['description'],
            "image": menuItem['image']
        }
