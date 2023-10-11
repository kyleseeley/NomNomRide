from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError


def validateQuantity(form, field):
  quantity = field.data
  if not quantity:
    raise ValidationError(
      "Please enter an amount for the item.")

class ShoppingCartItemForm(FlaskForm):
  quantity = IntegerField("Quantity", validators=[DataRequired(), validateQuantity])
