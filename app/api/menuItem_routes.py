from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.models import db,MenuItem, Restaurant
from app.forms import MenuItemsForm

items_routes = Blueprint('menuItems', __name__)


@items_routes.route('/restaurants/<int:restaurantId>/items',methods=['GET'])
def menuItems(restaurantId):
    """
    Query for all items from given restaurant and returns them in a list of user dictionaries
    """
    restaurant = Restaurant.query.get_or_404(restaurantId)
    print(restaurant.to_dict())
    items = MenuItem.query.all()
    return {'menuItems': [item.to_dict() for item in items]}

@items_routes.route('/items/<int:itemId>',methods=['GET'])
def menuItem(id):
    """
    Query for one item and returns it in json
    """
    item = MenuItem.query.get_or_404(id)
    return jsonify(item)


@items_routes.route('/restaurants/<int:restaurantId>/items',methods=['POST'])
@login_required
def createItem(restaurantId):
    """
    Create a new item and returns that item in a json
    """
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

@items_routes.route('/items/<int:itemId>',methods=['PUT'])
@login_required
def updateItem(itemId):
    """
    Query for a user by id and returns that user in a dictionary
    """
    item = MenuItem.query.get_or_404(itemId)
    restaurantId = item["restaurantId"]
    print("restaurantId", restaurantId)
    body = request.get_json()

    name= body["name"]
    type= body["type"]
    update_item = MenuItem(restaurantId=id,
                        name=name,
                        type=type
                      )
    db.session.add(update_item)
    db.session.commit()
    return jsonify(update_item.to_dict())

# @items_routes.route('/items/<int:id>',methods=['DELETE'])
# @login_required
# def deleteItem(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     body = request.get_json()
#     id = body.id
#     item = db.get_or_404(MenuItem,id)
#     db.session.delete(item)
#     return jsonify(item.to_dict())
