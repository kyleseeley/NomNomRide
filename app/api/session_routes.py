from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

session_routes = Blueprint('current', __name__)

@session_routes.route('/')
@login_required
def get_current_user():
  user = User.query.get(current_user.id)
  if user:
    return user.to_dict()
  else:
    return { 'error': 'User not found' }, 404

@session_routes.route("/reviews")
@login_required
def get_user_reviews():
  user = User.query.get(current_user.id)
  if user:
    return user.get_reviews()
  else:
    return { 'error': 'User not found' }, 404

@session_routes.route("/restaurants")
@login_required
def get_user_restaurants():
  user = User.query.get(current_user.id)
  if user:
    return user.get_restaurants()
  else:
    return { 'error': 'User not found' }, 404

@session_routes.route('/shopping-cart')
@login_required
def get_user_cart():
  user = User.query.get(current_user.id)
  if user:
    return user.get_cart()
  else:
    return { 'error': 'User not found' }, 404
