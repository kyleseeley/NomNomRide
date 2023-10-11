from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import Review


def review_data(form, field):
    review = field.data
    if len(review) < 10:
        raise ValidationError(
            "Please enter a review with at least 10 characters")


def star_data(form, field):
    stars = field.data
    if not stars:
        raise ValidationError("Please give a star rating")


class ReviewForm(FlaskForm):
    review = TextAreaField("Review", validators=[
                           DataRequired(), Length(min=10), review_data])
    stars = IntegerField("Stars", validators=[
                         DataRequired(), NumberRange(min=1, max=5), star_data])
    submit = SubmitField("Submit")
