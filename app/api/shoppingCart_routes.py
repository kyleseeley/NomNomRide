from flask import Blueprint, jsonify
from app.models import ShoppingCart, ShoppingCartItem, MenuItem, db
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages



shoppingCart_routes = Blueprint('shoppingCart', __name__, url_prefix="")


@shoppingCart_routes.route("/<int:shoppingCartId>")
@login_required
def get_shoppingCart(shoppingCartId):
    shoppingCart = ShoppingCart.query.get(shoppingCartId)

    if shoppingCart:
        if shoppingCart.userId == current_user.id:
            cart_items = ShoppingCartItem.query.filter_by(
                cartId=shoppingCart.id).all()

            cart_item_data = []

            cart_total = 0.00

            for item in cart_items:
                menu_item = MenuItem.query.get(item.id)
                item_total = item.itemQuantity * menu_item.price
                cart_total += float(item_total)

                item_data = {
                    "id": item.id,
                    "menuItemId": item.menuItemId,
                    "itemQuantity": item.itemQuantity,
                    "itemTotal": item_total
                }

                cart_item_data.append(item_data)

            shoppingCart.total = cart_total

            db.session.commit()

            return jsonify({ "shoppingCart": shoppingCart.to_dict(), "items": cart_item_data })
        else:
            return {"error": "Unauthorized. This shopping cart does not belong to the current user."}, 401
    else:
        return {"error": "Shopping cart not found."}, 404


@shoppingCart_routes.route("/<int:shoppingCartId>", methods=["DELETE"])
@login_required
def delete_shoppingCart(shoppingCartId):
    shoppingCart = ShoppingCart.query.get(shoppingCartId)

    if shoppingCart is None or shoppingCart.userId != current_user.id:
        return jsonify({"error": "Shopping Cart not found or user does not have permission to edit this Shopping Cart"}), 404

    db.session.delete(shoppingCart)
    db.session.commit()

    return jsonify({"message": "Shopping Cart deleted successfully"})
