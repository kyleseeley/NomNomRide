from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import Review


def validateQuantity(form, field):
  quantity = field.data
  if not quantity:
    raise ValidationError(
      "Please enter an amount for the item.")

class ShoppingCartItemForm(FlaskForm):
  quantity = IntegerField("Quantity", validators=[DataRequired(), validateQuantity])
