from flask_wtf import FlaskForm
from wtforms import StringField,URLField, SelectField
from wtforms.validators import DataRequired, ValidationError


def validateName(form, field):
  name = field.data
  if not name:
    raise ValidationError('Please enter a name.')
def validateType(form, field):
  type = field.data
  if not type:
    raise ValidationError('Please enter a type.')
  if len(type) > 50:
    raise ValidationError('Length of type is too long.')
def validatePrice(form, field):
  price = field.data
  if not price:
    raise ValidationError('Please enter a price.')
def validateImage(form, field):
  image = field.data
  if not image:
    raise ValidationError('Please enter an imageUrl.')

class MenuItemsForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(),validateName])
    type = SelectField("type", choices=["Entrees", "Side Dish","Appetizer","Dessert"], validators=[DataRequired(), validateType])
    price = StringField("price", validators=[DataRequired(),validatePrice])
    description = StringField("description")
    image = URLField("image")
