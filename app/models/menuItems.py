from .db import db, environment, SCHEMA, add_prefix_for_prod



class MenuItems(db.Model):
    __tablename__ = 'menuItems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurantId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("restaurant.id")))
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(60), nullable=False)
    image = db.Column(db.String())
    
    restaurant = db.relationship("Restaurant", back_populates="menuItems")


def to_dict(self):
    return {
        "id": self.id,
        "restaurantId": self.restaurantId,
        "name": self.name,
        "type": self.type,
        "image": self.image
    }
