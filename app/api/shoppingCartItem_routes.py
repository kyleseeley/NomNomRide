from flask import Blueprint
from flask_login import login_required, current_user
from app.models import ShoppingCartItem, ShoppingCart, db
from app.forms import ShoppingCartItemForm
from .auth_routes import validation_errors_to_error_messages


cartItem_routes = Blueprint('cartItem', __name__)

@cartItem_routes.route('/<int:shoppingCartItemId>', methods=["PUT"])
@login_required
def update_cartItem(shoppingCartItemId):
	"""
	Add item to cart, and if cart doesn't exist create a new cart
	"""
	if not current_user:
		return { 'error': 'Unauthorized' }, 401
	shoppingCartItem = ShoppingCartItem.query.get(shoppingCartItemId)
	if not shoppingCartItem:
		return { 'error': 'Cart item not found' }
	form = ShoppingCartItemForm()
	if form.validate_on_submit():
		shoppingCartItem.itemQuantity=form.data["quantity"]
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
	cart = current_user.get_cart()
	if cart['cart']['id'] != shoppingCartItem.cartId:
		return { 'error': 'Unauthorized' }, 401

	if len(cart['items']) == 1: # if last item in cart, delete cart as well
		cart = ShoppingCart.query.get(cart['cart']['id'])
		db.session.delete(cart)

	db.session.delete(shoppingCartItem)
	db.session.commit()


	return { "message": "Successfully deleted" }
