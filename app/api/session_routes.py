from flask import Blueprint, request
from app.forms import SignUpForm
from flask_login import login_required, current_user
from app.models import User, db
from .auth_routes import validation_errors_to_error_messages

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

@session_routes.route('/userInfo', methods=['PUT'])
@login_required
def updateUserInfo():
  user = User.query.get(current_user.id)

  form = SignUpForm(obj=user)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    user.firstname=form.data['firstname']
    user.lastname=form.data['lastname']
    user.email=form.data['email']
    user.username=form.data['username']
    user.address=form.data['address']
    user.city=form.data['city']
    user.state=form.data['state']
    user.lat=form.data['lat']
    user.lng=form.data['lng']
    user.password=form.data['password']
    db.session.commit()
    return user.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@session_routes.route('/userInfo', methods=['DELETE'])
@login_required
def deleteUser():
  user = User.query.get(current_user.id)
  if not user:
    return { 'error': 'User not found' }, 404
  db.session.delete(user)
  db.session.commit()
  return { 'message': 'Deleted successfully' }
