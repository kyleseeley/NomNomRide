from flask_wtf import FlaskForm
from wtforms import StringField,URLField
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
def validateImage(form, field):
  image = field.data
  if not image:
    raise ValidationError('Please enter an imageUrl.')

class MenuItemsForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(),validateName])
    type = StringField("type", validators=[DataRequired(),validateType])
    image = URLField("image", validators=[])
