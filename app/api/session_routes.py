from flask import Blueprint, request, jsonify
from app.forms import SignUpForm
from flask_login import login_required, current_user
from app.models import User, Order, db
from .auth_routes import validation_errors_to_error_messages
import stripe
from datetime import datetime

stripe.api_key = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'

session_routes = Blueprint('current', __name__)


@session_routes.route('/')
@login_required
def get_current_user():
    user = User.query.get(current_user.id)
    if user:
        return user.to_dict()
    else:
        return {'error': 'User not found'}, 404


@session_routes.route("/reviews")
@login_required
def get_user_reviews():
    user = User.query.get(current_user.id)
    if user:
        return user.get_reviews()
    else:
        return {'error': 'User not found'}, 404


@session_routes.route("/restaurants")
@login_required
def get_user_restaurants():
    user = User.query.get(current_user.id)
    if user:
        return user.get_restaurants()
    else:
        return {'error': 'User not found'}, 404


@session_routes.route('/shopping-cart')
@login_required
def get_user_carts():
    user = User.query.get(current_user.id)
    if user:
        return user.get_carts()
    else:
        return {'error': 'User not found'}, 404


@session_routes.route('/userInfo', methods=['PUT'])
@login_required
def updateUserInfo():
    user = User.query.get(current_user.id)

    form = SignUpForm(obj=user)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.firstname = form.data['firstname']
        user.lastname = form.data['lastname']
        user.email = form.data['email']
        user.username = form.data['username']
        user.address = form.data['address']
        user.city = form.data['city']
        user.state = form.data['state']
        user.lat = form.data['lat']
        user.lng = form.data['lng']
        user.password = form.data['password']
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@session_routes.route('/userInfo', methods=['DELETE'])
@login_required
def deleteUser():
    user = User.query.get(current_user.id)
    if not user:
        return {'error': 'User not found'}, 404
    db.session.delete(user)
    db.session.commit()
    return {'message': 'Deleted successfully'}


@session_routes.route('/checkout', methods=['POST'])
@login_required
def userCheckout():
    user = User.query.get(current_user.id)
    if not user:
        return {'error': 'User not found'}, 404

    restaurantId = request.json.get("restaurantId")

    if not restaurantId:
        return {'error': 'Restaurant ID is required'}, 400

    cart_info = user.get_specific_cart(restaurantId)
    cart_items = cart_info.get("items", [])

    total_amount = 0
    line_items = []

    for cart_item in cart_items:
        item_details = cart_item  # Use the dictionary directly

        line_item = {
            'price': item_details['price'],
            'quantity': item_details['quantity'],
        }
        line_items.append(line_item)

        total_amount += item_details['price'] * item_details['quantity']

    new_order = Order(
        userId=user.id,
        restaurantId=restaurantId,
        total=total_amount,
        orderDate=datetime.now()
    )

    try:
        db.session.add(new_order)
        db.session.commit()

        return {'message': 'Order placed successfully'}, 200

    except Exception as e:
        return {'error': str(e)}, 500


@session_routes.route('/orders')
@login_required
def get_user_orders():
    user = User.query.get(current_user.id)
    if not user:
        return {'error': 'User not found'}, 404

    orders = [order.to_dict() for order in user.orders]

    return jsonify(orders)
