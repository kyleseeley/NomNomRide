from flask import Blueprint, jsonify, request
from app.models import Review, db
from app.forms.review_form import ReviewForm
from flask_login import current_user, login_required

review_routes = Blueprint('reviews', __name__, url_prefix="")


@review_routes.route("/<int:reviewId>", methods=["PUT"])
@login_required
def edit_review(reviewId):
    review = Review.query.get(reviewId)

    if review is None or review.userId != current_user.id:
        return jsonify({"error": "Review not found or user does not have permission to edit this review"}), 404

    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        review.review = data["review"]
        review.stars = data["stars"]

        db.session.commit()

        return jsonify({"message": "Review updated successfully"})


@review_routes.route("/<int:reviewId>", methods=["DELETE"])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)

    if review is None or review.userId != current_user.id:
        return jsonify({"error": "Review not found or user does not have permission to edit this review"}), 404

    db.session.delete(review)
    db.session.commit()

    return jsonify({"message": "Review deleted successfully"})


@review_routes.route("/<int:reviewId>")
def get_one_review(reviewId):
    review = Review.query.get(reviewId)

    if review is not None:
        return jsonify(review.to_dict())
    else:
        return jsonify({"message": "Review not found"}, 404)
