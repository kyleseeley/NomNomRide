from flask import Blueprint
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if not user:
        return { "error": "User does not exist" }
    return user.to_dict()


# @user_routes.route("/<int:userId>/reviews")
# @login_required
# def get_user_reviews(userId):
#     if userId != current_user.id:
#         return jsonify({"error": "You don't have permission to access this user's reviews"}), 401

#     # reviews = Review.query.filter_by(userId=userId).all()

#     # reviewList = [review.to_dict() for review in reviews]
#     user = User.query.get(current_user.id)

#     return jsonify(user.get_user_reviews)

# @user_routes.route("/<int:userId>/restaurants")
# @login_required
# def get_restaurants(userId):
#     if userId != current_user.id:
#         return jsonify({"error": "You don't have permission to access this user's restaurants"}), 401

#     user = User.query.get(current_user.id)

#     return jsonify(user.get_restaurants)

# @user_routes.route('/<int:userId>/shopping-cart')
# @login_required
# def get_cart(userId):
#     if userId != current_user.id:
#         return jsonify({"error": "You don't have permission to access this user's cart"}), 401

#     user = User.query.get(current_user.id)

#     return jsonify(user.get_cart)
