from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.models import db,MenuItem, Restaurant
from app.forms import MenuItemsForm

items_routes = Blueprint('menuItems', __name__)


#get all items by one restaurant
@items_routes.route('/restaurants/<int:restaurantId>/items',methods=['GET'])
def menuItems(restaurantId):
    """
    Query for all items from given restaurant and returns them in a list of user dictionaries
    """
    items = MenuItem.query.filter_by(restaurantId=restaurantId).all()
    return {'menuItems': [item.to_dict() for item in items]}


#get one item
@items_routes.route('/items/<int:itemId>',methods=['GET'])
def menuItem(itemId):

    item = MenuItem.query.get(itemId)
    if not item:
        return jsonify({"error": "Item not found!"}), 404
    return jsonify(item.to_dict())


#create a new item by specified restaurant
@items_routes.route('/restaurants/<int:restaurantId>/items',methods=['POST'])
@login_required
def createItem(restaurantId):

    restaurant = Restaurant.query.get(restaurantId)
    if  not restaurant or restaurant.ownerId != current_user.id:
        return jsonify({"error": "Not permitted or restaurant does not exict!"}), 401
    form = MenuItemsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name= form.data["name"]
        type= form.data["type"]
        new_item = MenuItem(restaurantId=restaurantId,
                            name=name,
                            type=type
                        )
        db.session.add(new_item)
        db.session.commit()
        return jsonify(new_item.to_dict())


#edit an item by specified restaurant
@items_routes.route('/items/<int:itemId>',methods=['PUT'])
@login_required
def updateItem(itemId):

    item = MenuItem.query.get(itemId)
    restaurant = Restaurant.query.get_or_404(item.restaurantId)
    if  not restaurant or restaurant.ownerId != current_user.id:
        return jsonify({"error": "Not permitted or restaurant does not exict!"}), 401

    form = MenuItemsForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        item.name = data["name"]
        item.type = data["type"]

        db.session.commit()

        return jsonify(item.to_dict())

    # body = request.get_json()

    # name= body["name"]
    # type= body["type"]
    # update_item = MenuItem(restaurantId=id,
    #                     name=name,
    #                     type=type
    #                   )
    # db.session.add(update_item)
    # db.session.commit()
    # return jsonify(update_item.to_dict())


#delete one item
@items_routes.route('/items/<int:itemId>',methods=['DELETE'])
@login_required
def deleteItem(itemId):
    item = MenuItem.query.get(itemId)
    if not item:
        return jsonify({"error": "Item not found!"}), 404
    restaurant = Restaurant.query.get(item.restaurantId)
    if not restaurant or restaurant.ownerId != current_user.id:
        return jsonify({"error": "Not permitted or restaurant does not exict!"}), 401

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "The item was deleted successfully"})
