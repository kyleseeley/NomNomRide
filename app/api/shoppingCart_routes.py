from flask import Blueprint, jsonify
from app.models import ShoppingCart, db
from flask_login import current_user, login_required


shoppingCart_routes = Blueprint('shoppingCart', __name__, url_prefix="")

@shoppingCart_routes.route("/<int:cartId>", methods=["DELETE"])
@login_required
def delete_shoppingCart(cartId):
    deleteCart = ShoppingCart.query.get(cartId)
    if not deleteCart:
        return { 'error': 'Cart does not exist' }, 404
    if deleteCart.userId != current_user.id:
        return { 'error': 'Unauthorized' }, 401
    db.session.delete(deleteCart)
    db.session.commit()

    return jsonify({"message": "Cart deleted successfully"})
