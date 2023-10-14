from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db,MenuItem, Restaurant
from app.forms import MenuItemsForm

items_routes = Blueprint('menuItems', __name__)


#get one item
@items_routes.route('/<int:itemId>',methods=['GET'])
def menuItem(itemId):

    item = MenuItem.query.get(itemId)
    if not item:
        return jsonify({"error": "Item not found!"}), 404
    return jsonify(item.to_dict())


#edit an item by specified restaurant
@items_routes.route('/<int:itemId>',methods=['PUT'])
@login_required
def updateItem(itemId):

    item = MenuItem.query.get(itemId)
    restaurant = Restaurant.query.get_or_404(item.restaurantId)
    if  not restaurant or restaurant.ownerId != current_user.id:
        return jsonify({"error": "Not permitted or restaurant does not exist!"}), 401

    form = MenuItemsForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        item.name = data["name"]
        item.type = data["type"]

        db.session.commit()

        return jsonify(item.to_dict())
    else :
        return form.errors


#delete one item
@items_routes.route('/<int:itemId>',methods=['DELETE'])
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
