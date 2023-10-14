from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import ShoppingCartItem, ShoppingCart, db
from app.forms import ShoppingCartItemForm

cartItem_routes = Blueprint('cartItem', __name__)

@cartItem_routes.route('/:shoppingCartItemId', methods=["PUT"])
def update_cartItem(shoppingCartItemId):
	"""
	Add item to cart, and if cart doesn't exist create a new cart
	"""
	shoppingCartItem = ShoppingCartItem.query.filter(ShoppingCartItem.id == shoppingCartItemId).first()
	if not shoppingCartItem:
		return { 'error': 'Cart item not found' }
	form = ShoppingCartItemForm()
	if form.validate_on_submit():
		shoppingCartItem.itemQuantity=form.data["quantity"]
		db.session.commit()
		return shoppingCartItem.to_dict()

@cartItem_routes.route('/:shoppingCartItemId', methods=["DELETE"])
def delete_cartItem(shoppingCartItemId):
	"""
	Delete cart item, if no more cart items delete cart
	# """
	shoppingCartItem = ShoppingCartItem.query.filter(ShoppingCartItem.id == shoppingCartItemId).first()
	if not shoppingCartItem:
		return { 'error': 'Cart item not found' }

	form = ShoppingCartItemForm()
	if form.validate_on_submit():
		db.session.delete(shoppingCartItem)
		db.session.commit()

		return { "message": "Successfully deleted" }
