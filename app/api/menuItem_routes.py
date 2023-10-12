# from flask import Blueprint, jsonify,request
# from flask_login import login_required, current_user
# from app.models import db,MenuItem

# menu_items_routes = Blueprint('menuItems', __name__)


# @menu_items_routes.route('/',method=['GET'])
# def menuItems():
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     items = MenuItem.query.all()
#     return {'menuItems': [item.to_dict() for item in items]}


# @menu_items_routes.route('/',method=['POST'])
# @login_required
# def createItem():
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     body = request.get_json()
#     owner_id = current_user.id
#     name= body.name
#     type=body.type
#     new_item = MenuItem(restaurant_id=owner_id,
#                         name=name,
#                         type=type
#                       )
#     db.session.add(new_item)
#     db.session.commit()
#     return jsonify(new_item.to_dict())

# @menu_items_routes.route('/<int:id>',method=['PUT'])
# @login_required
# def updateItem(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     body = request.get_json()

#     name= body.name
#     type=body.type
#     update_item = MenuItem(restaurant_id=owner_id,
#                         name=name,
#                         type=type
#                       )
#     db.session.add(update_item)
#     db.session.commit()
#     return jsonify(update_item.to_dict())

# @menu_items_routes.route('/<int:id>',method=['DELETE'])
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
