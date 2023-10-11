from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Restaurant
from app.forms import RestaurantForm

restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/', methods=['GET'])
@login_required
def restaurants():
    """
    Query for all restaurants and returns them in a list of restaurant dictionaries
    """
    restaurants = Restaurant.query.all()
    form = RestaurantForm()
    return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}


@restaurant_routes.route('/<int:id>')
@login_required
def restaurant(id):
    """
    Query for a restaurant by id and returns that restaurant in a dictionary
    """
    restaurant = Restaurant.query.get(id)
    return restaurant.to_dict()
