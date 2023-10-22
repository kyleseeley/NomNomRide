from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float())
    lng = db.Column(db.Float())
    hashed_password = db.Column(db.String(255), nullable=False)

    restaurants = db.relationship("Restaurant", back_populates="owner")

    reviews = db.relationship("Review", back_populates="user")

    shoppingCart = db.relationship("ShoppingCart", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'username': self.username,
            'address': self.address,
            'city': self.city,
            'state': self.state
        }

    def get_cart(self):
        return {
            'cart': self.shoppingCart.to_dict()
        }

    def get_user_restaurants(self):
        return {
            'restaurants': [restaurant.to_dict() for restaurant in self.restaurants]
        }

    def get_user_reviews(self):
        return {
            'reviews': [review.to_dict() for review in self.reviews]
        }
