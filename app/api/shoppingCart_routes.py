from flask import Blueprint, jsonify
from app.models import ShoppingCart, db
from flask_login import current_user, login_required


shoppingCart_routes = Blueprint('shoppingCart', __name__, url_prefix="")

@shoppingCart_routes.route("/", methods=["DELETE"])
@login_required
def delete_shoppingCart():
    cart = current_user.get_cart()
    if 'cart' not in cart:
        return { 'error': 'User does not have an active cart.' }
    deleteCart = ShoppingCart.query.get(cart['cart']['id'])
    db.session.delete(deleteCart)
    db.session.commit()

    return jsonify({"message": "Shopping Cart deleted successfully"})
