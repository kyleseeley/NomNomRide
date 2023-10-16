from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Restaurant, Review, MenuItem, ShoppingCart, db
from app.forms import RestaurantForm, ReviewForm, MenuItemsForm
from .auth_routes import validation_errors_to_error_messages


restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/')
def all_restaurants():
    """
    Query for all restaurants and returns them in a list of restaurant dictionaries
    """
    restaurants = Restaurant.query.all()
    return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}


@restaurant_routes.route('/', methods=['POST'])
@login_required
def post_restaurant():
    """
    Query for all restaurants and returns them in a list of restaurant dictionaries
    """
    if not current_user:
        return {'error': 'Unauthorized'}, 403
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_restaurant = Restaurant(
            ownerId=current_user.id,
            address=data["address"],
            city=data["city"],
            state=data["state"],
            lat=data["lat"],
            lng=data["lng"],
            name=data["name"],
            type=data["type"],
            image=data["image"],
            starRating=0,
            numReviews=0
        )

        db.session.add(new_restaurant)
        db.session.commit()
        return new_restaurant.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@restaurant_routes.route('/<int:restaurantId>')
def single_restaurant(restaurantId):
    """
    Query for all restaurants and returns them in a list of restaurant dictionaries
    """
    # restaurant = Restaurant.query().get(restaurantId)
    restaurant = Restaurant.query.filter(Restaurant.id == restaurantId).first()
    if not restaurant:
        return {'error': 'Restaurant not found'}, 404

    return restaurant.to_dict()


@restaurant_routes.route('/<int:restaurantId>', methods=['PUT'])
@login_required
def update_restaurant(restaurantId):
    """
    Query for all restaurants and returns them in a list of restaurant dictionaries
    """
    restaurant = Restaurant.query.filter(Restaurant.id == restaurantId).first()
    if not restaurant:
        return {'error': 'Restaurant not found'}, 404
    if restaurant.ownerId != current_user.id:
        return {'error': 'Unauthorized'}, 403
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

        return restaurant.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@restaurant_routes.route("/<int:restaurantId>", methods=['DELETE'])
@login_required
def delete_restaurant(restaurantId):
    restaurant = Restaurant.query.filter(Restaurant.id == restaurantId).first()
    if not restaurant:
        return {'error': 'Restaurant not found'}, 404
    if restaurant.ownerId != current_user.id:
        return {'error': 'Unauthorized'}, 403
    db.session.delete(restaurant)
    db.session.commit()
    return {'message': 'Successfully deleted'}


@restaurant_routes.route("/<int:restaurantId>/reviews")
def restaurant_reviews(restaurantId):
    restaurant = Restaurant.query.get(restaurantId)

    if restaurant is None:
        return jsonify({"message": "Restaurant not found"}), 404

    reviews = Review.query.filter_by(restaurantId=restaurantId).all()

    if not reviews:
        return jsonify({"message": "This restaurant has no reviews."})

    return {'reviews': [review.to_dict() for review in reviews]}


@restaurant_routes.route("/<int:restaurantId>/reviews", methods=["POST"])
@login_required
def post_review(restaurantId):
    restaurant = Restaurant.query.filter(Restaurant.id == restaurantId).first()
    if not restaurant:
        return jsonify({"error": "Restaurant does not exist!"}), 404
    if restaurant.ownerId == current_user.id:
        return { "error": "Can't post a review for your own restaurant." }, 403
    existing_review = Review.query.filter(Review.restaurantId == restaurantId, Review.userId == current_user.id).first()
    if existing_review:
        return { "error": "You already have a review for this restaurant."}, 403
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        new_review = Review(
        userId=current_user.id,
        restaurantId=restaurantId,
        review=data["review"],
        stars=data["stars"]
        )

        db.session.add(new_review)
        db.session.commit()
        db.session.add(new_review)
        db.session.commit()

		# Updating restaurant rating and number of reviews
        restaurantReviews = Review.query.filter(
        Review.restaurantId == restaurantId).all()
        restaurant.numReviews += 1
        totalRating = sum(review.stars for review in restaurantReviews)
        restaurant.starRating = round(totalRating / restaurant.numReviews, 1)

        db.session.commit()
        db.session.commit()

        return jsonify(new_review.to_dict())
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# get all items by one restaurant
@restaurant_routes.route('/<int:restaurantId>/items', methods=['GET'])
def menuItems(restaurantId):
    """
    Query for all items from given restaurant and returns them in a list of user dictionaries
    """
    restaurant = Restaurant.query.get(restaurantId)
    if not restaurant:
        return jsonify({"error": "Restaurant does not exist!"}), 404

    items = MenuItem.query.filter_by(restaurantId=restaurantId).all()
    return {'menuItems': [item.to_dict() for item in items]}


# create a new item by specified restaurant
@restaurant_routes.route('/<int:restaurantId>/items', methods=['POST'])
@login_required
def createItem(restaurantId):

  restaurant = Restaurant.query.get(restaurantId)
  if not restaurant or restaurant.ownerId != current_user.id:
    return jsonify({"error": "Not permitted or restaurant does not exist!"}), 401
  form = MenuItemsForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    name = form.data["name"]
    type = form.data["type"]
    price = form.data["price"]
    description =form.data["description"]
    image=form.data["image"]
    new_item = MenuItem(restaurantId=restaurantId,
    name=name,
    type=type,
    price=price,
    description=description,
    image=image
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict())
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@restaurant_routes.route('/<int:restaurantId>/shopping-cart', methods=['POST'])
@login_required
def post_shoppingCart(restaurantId):
    carts = ShoppingCart.query.filter(ShoppingCart.userId == current_user.id).first()
    if carts:
        return { 'message': 'User already has a cart' }
    new_cart = ShoppingCart(
        userId=current_user.id,
		restaurantId=restaurantId,
        total=0
	)
    db.session.add(new_cart)
    db.session.commit()
    return new_cart.to_dict()
