from flask import Blueprint, jsonify, session, request
from app.models import Review, db
from app.forms import review_form
from flask_login import current_user, login_required

review_routes = Blueprint('reviews', __name__, url_prefix="")




