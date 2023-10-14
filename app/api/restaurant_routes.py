from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import Restaurant, db
from app.forms import RestaurantForm

restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/', methods=['GET'])
def restaurants():
	"""
	Query for all restaurants and returns them in a list of restaurant dictionaries
	"""
	restaurants = Restaurant.query.all()
	return { 'restaurants': [restaurant.to_dict() for restaurant in restaurants] }

@restaurant_routes.route('/', methods=['POST'])
@login_required
def restaurants():
	"""
	Query for all restaurants and returns them in a list of restaurant dictionaries
	"""
	form = RestaurantForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	if form.validate_on_submit():
		data = form.data
		new_restaurant = Restaurant(
			address=data["address"],
			city=data["city"],
			state=data["state"],
			lat=data["lat"],
			lng=data["lng"],
			name=data["name"],
			type=data["type"],
			image=data["image"]
		)

		db.session.add(new_restaurant)
		db.session.commit()
		return redirect(f"/restaurants/{new_restaurant.id}")

@restaurant_routes.route('/<int:restaurantId>', methods=['GET'])
def restaurants(restaurantId):
	"""
	Query for all restaurants and returns them in a list of restaurant dictionaries
	"""
	# restaurant = Restaurant.query().get(restaurantId)
	restaurant = Restaurant.query.filter(Restaurant.id == restaurantId).first()

	if restaurant is None:
		return { 'error': 'Restaurant not found' }, 404
	return restaurant.to_dict()

@restaurant_routes.route('/<int:restaurantId>', methods=['PUT, DELETE'])
@login_required
def restaurants(restaurantId):
	"""
	Query for all restaurants and returns them in a list of restaurant dictionaries
	"""
	restaurant = Restaurant.query.filter(Restaurant.id == restaurantId).first()
	if restaurant.ownerId != current_user.id:
		return { 'error': 'Unauthorized' }
	if request.method == 'DELETE':
		db.session.delete(restaurant)
		db.session.commit()
		return { 'message': 'Successfully deleted' }
	form = RestaurantForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	if form.validate_on_submit():
		data = form.data
		restaurant.address = data["address"]
		restaurant.city = data["city"]
		restaurant.state = data["state"]
		restaurant.lat = data["lat"]
		restaurant.lng = data["lng"]
		restaurant.name = data["name"]
		restaurant.type = data["type"]
		restaurant.image = data["image"]
		db.session.commit()

		return redirect(f"/restaurants/{restaurant.id}")
