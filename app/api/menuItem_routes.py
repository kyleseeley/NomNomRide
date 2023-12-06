from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, MenuItem, Restaurant, ShoppingCart, ShoppingCartItem
from app.forms import MenuItemsForm, ShoppingCartItemForm
from .auth_routes import validation_errors_to_error_messages


items_routes = Blueprint('menuItems', __name__)


# get one item
@items_routes.route('/<int:itemId>', methods=['GET'])
def menuItem(itemId):

    item = MenuItem.query.get(itemId)
    if not item:
        return jsonify({"error": "Item not found!"}), 404
    return jsonify(item.to_dict())


# edit an item by specified restaurant
@items_routes.route('/<int:itemId>', methods=['PUT'])
@login_required
def updateItem(itemId):

    item = MenuItem.query.get(itemId)
    if not item:
        return {"error": "Item not found"}, 404
    restaurant = Restaurant.query.get_or_404(item.restaurantId)
    if not restaurant or restaurant.ownerId != current_user.id:
        return jsonify({"error": "Not permitted or restaurant does not exist!"}), 401

    form = MenuItemsForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        item.name = data["name"]
        item.type = data["type"]
        item.price = data["price"]
        item.description = data["description"]
        item.image = data["image"]

        db.session.commit()

        return jsonify(item.to_dict())
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# delete one item
@items_routes.route('/<int:itemId>', methods=['DELETE'])
@login_required
def deleteItem(itemId):
    item = MenuItem.query.get(itemId)
    if not item:
        return jsonify({"error": "Item not found!"}), 404
    restaurant = Restaurant.query.get(item.restaurantId)
    if not restaurant or restaurant.ownerId != current_user.id:
        return jsonify({"error": "Not permitted or restaurant does not exist!"}), 401

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "The item was deleted successfully"})


@items_routes.route('/<int:itemId>/shopping-cart-items', methods=["POST"])
@login_required
def post_shoppingCartItem(itemId):

    if not current_user:
        return {'error': 'Unauthorized'}, 401
    menuItem = MenuItem.query.get(itemId)
    if not menuItem:
        return {'error': 'Item not found'}, 404
    cart = current_user.get_specific_cart(menuItem.restaurantId)

    if 'cart' not in cart:
        return {'error': 'Cart not found'}, 404
    form = ShoppingCartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # first check if user already has the item in their cart
        # if user already has item, just increase quantity
        # will have to change later if individual items have other addons
        updateCart = ShoppingCart.query.get(cart['cart']['id'])
        for item in cart['items']:
            if item['menuItemId'] == itemId:
                currItem = ShoppingCartItem.query.get(item['id'])
                updateCart.total += menuItem.price * form.data['quantity']
                currItem.quantity += form.data['quantity']
                db.session.commit()
                return currItem.to_dict()

        # update cart total
        updateCart.total += menuItem.price * form.data['quantity']

        # create new shopping cart item
        new_shoppingCartItem = ShoppingCartItem(
            cartId=updateCart.id,
            menuItemId=itemId,
            quantity=form.data["quantity"]
        )

        db.session.add(new_shoppingCartItem)
        db.session.commit()
        return new_shoppingCartItem.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
