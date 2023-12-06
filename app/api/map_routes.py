from flask import Blueprint, jsonify
from app.config import Config


map_routes = Blueprint('maps', __name__)

@map_routes.route("/key", methods=["POST"])
def getMapKey():
    return jsonify(Config.GOOGLEMAPS_KEY)
