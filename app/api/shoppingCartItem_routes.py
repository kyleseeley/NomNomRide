from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import ShoppingCartItem, ShoppingCart, db
from app.forms import ShoppingCartItemForm
from .auth_routes import validation_errors_to_error_messages


cartItem_routes = Blueprint('cartItem', __name__)

@cartItem_routes.route('/<int:shoppingCartItemId>', methods=["PUT"])
@login_required
def update_cartItem(shoppingCartItemId):
	if not current_user:
		return { 'error': 'Unauthorized' }, 401
	shoppingCartItem = ShoppingCartItem.query.get(shoppingCartItemId)
	if not shoppingCartItem:
		return { 'error': 'Cart item not found' }
	form = ShoppingCartItemForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	if form.validate_on_submit():

		# update cart total
		cart = ShoppingCart.query.get(shoppingCartItem.cartId)
		itemDetails = shoppingCartItem.to_dict()
		cart.total += itemDetails['price'] * (form.data['quantity'] - shoppingCartItem.quantity)

		# updating cartItem quantity
		shoppingCartItem.quantity=form.data["quantity"]
		db.session.commit()
		return shoppingCartItem.to_dict()
	else:
		return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@cartItem_routes.route('/<int:shoppingCartItemId>', methods=["DELETE"])
@login_required
def delete_cartItem(shoppingCartItemId):
	"""
	Delete cart item
	# """
	if not current_user:
		return { 'error': 'Unauthorized' }, 401
	shoppingCartItem = ShoppingCartItem.query.filter(ShoppingCartItem.id == shoppingCartItemId).first()
	if not shoppingCartItem:
		return { 'error': 'Cart item not found' }
	cart = ShoppingCart.query.get(shoppingCartItem.cartId)
	cart_dict = current_user.get_specific_cart(cart.restaurantId)

	# if last item in cart, delete cart as well
	if len(cart_dict['items']) == 1:
		db.session.delete(cart)
	else:
		# update cart total
		itemDetails = shoppingCartItem.to_dict()
		cart.total -= itemDetails['price'] * shoppingCartItem.quantity

	db.session.delete(shoppingCartItem)
	db.session.commit()


	return { "message": "Successfully deleted" }
