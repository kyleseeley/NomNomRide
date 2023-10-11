from flask import Blueprint, jsonify, request
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
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}
