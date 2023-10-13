from flask import Blueprint, jsonify, session, request
from app.models import Review, db
from app.forms.review_form import ReviewForm
from flask_login import current_user, login_required

review_routes = Blueprint('reviews', __name__, url_prefix="")


@review_routes.route("/restaurants/<int:restaurantId>/reviews")
def restaurant_reviews(restaurantId):
    reviews = Review.query.filter_by(restaurantId=restaurantId).all()

    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route("/restaurants/<int:restaurantId>/reviews", methods=["POST"])
@login_required
def post_review(restaurantId):
    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        new_review = Review(
            userId=current_user.id,
            restaurantId=restaurantId,
            review=data["review"],
            stars=data["stars"]
        )

        db.session.add(new_review)
        db.session.commit()

        return jsonify(new_review.to_dict())


@review_routes.route("/reviews/:reviewId", methods=["PUT"])
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


@review_routes.route("/reviews/<int:reviewId>", methods=["DELETE"])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)

    if review is None or review.userId != current_user.id:
        return jsonify({"error": "Review not found or user does not have permission to edit this review"}), 404

    db.session.delete(review)
    db.session.commit()

    return jsonify({"message": "Review deleted successfully"})


@review_routes.route("/users/<int:userId>/reviews")
@login_required
def get_user_reviews(userId):
    if userId != current_user.id:
        return jsonify({"error": "You don't have permission to access this user's reviews"}), 403

    reviews = Review.query.filter_by(userId=userId).all()

    reviewList = [review.to_dict() for review in reviews]

    return jsonify({"reviews": reviewList})
