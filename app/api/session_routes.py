from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

session_routes = Blueprint('current', __name__)

@session_routes.route('/')
@login_required
def get_current_user():
  user = User.query.get(current_user.id)
  return user.to_dict()

@session_routes.route("/reviews")
@login_required
def get_user_reviews():
  user = User.query.get(current_user.id)
  return user.get_reviews()

@session_routes.route("/restaurants")
@login_required
def get_user_restaurants():
  user = User.query.get(current_user.id)
  return user.get_restaurants()

@session_routes.route('/shopping-cart')
@login_required
def get_user_cart():
  user = User.query.get(current_user.id)
  return user.get_cart()
