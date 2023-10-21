from flask import Blueprint, jsonify
from app.models import ShoppingCart, ShoppingCartItem, MenuItem, User, Restaurant, db
from flask_login import current_user, login_required



shoppingCart_routes = Blueprint('shoppingCart', __name__, url_prefix="")


@shoppingCart_routes.route("/<int:shoppingCartId>")
@login_required
def get_shoppingCart(shoppingCartId):
    shoppingCart = ShoppingCart.query.get(shoppingCartId)

    if shoppingCart:
        if shoppingCart.id == current_user.cartId:
            cart_items = ShoppingCartItem.query.filter_by(
                cartId=shoppingCart.id).all()

            cartRestaurant = Restaurant.query.get(shoppingCart.restaurantId)

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

            return jsonify({ "shoppingCart": shoppingCart.to_dict(), "items": cart_item_data, "restaurant": cartRestaurant.cart_to_dict() })
        else:
            return {"error": "Unauthorized. This shopping cart does not belong to the current user."}, 401
    else:
        return {"error": "Shopping cart not found."}, 404


@shoppingCart_routes.route("/<int:shoppingCartId>", methods=["DELETE"])
@login_required
def delete_shoppingCart(shoppingCartId):
    shoppingCart = ShoppingCart.query.get(shoppingCartId)

    if shoppingCart is None or shoppingCart.id != current_user.cartId:
        return jsonify({"error": "Shopping Cart not found or user does not have permission to edit this Shopping Cart"}), 404
    user = User.query.get(current_user.id)
    if not user:
        return jsonify({ "error": "User not found" })
    user.cartId = None
    db.session.delete(shoppingCart)
    db.session.commit()

    return jsonify({"message": "Shopping Cart deleted successfully"})
