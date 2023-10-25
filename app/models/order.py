from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    restaurantId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("restaurants.id")), nullable=False)
    total = db.Column(db.DECIMAL(6,2), nullable=False)
    orderDate = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user = db.relationship('User', back_populates='orders')

    restaurant = db.relationship('Restaurant', back_populates='orders')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "restaurantId": self.restaurantId,
            "total": self.total,
            "orderDate": self.orderDate,
            'restaurantName': self.restaurant.to_dict()['name']
        }
