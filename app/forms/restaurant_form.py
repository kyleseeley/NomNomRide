from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, URLField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError

def validateAddress(form, field):
  address = field.data
  if not address:
    raise ValidationError('Please enter an address.')
def validateCity(form, field):
  city = field.data
  if not city:
    raise ValidationError('Please enter an city.')
  if len(city) > 50:
    raise ValidationError('City name is too long.')
def validateState(form, field):
  state = field.data
  if not state:
    raise ValidationError('Please enter an state.')
  if len(state) > 50:
    raise ValidationError('State name is too long.')
def validateCountry(form, field):
  country = field.data
  if not country:
    raise ValidationError('Please enter an country.')
  if len(country) > 50:
    raise ValidationError('Country name is too long.')
def validateLat(form, field):
  lat = field.data
  if not lat:
    raise ValidationError('Please enter an lat.')
  if lat > 90 or lat < -90:
    raise ValidationError('Latitude is invalid.')
def validateLng(form, field):
  lng = field.data
  if not lng:
    raise ValidationError('Please enter an lng.')
  if lng > 180 or lng < -180:
    raise ValidationError('Longitude is invalid.')
def validateName(form, field):
  name = field.data
  if not name:
    raise ValidationError('Please enter an name.')
  if len(name) > 50:
    raise ValidationError('Name is too long.')
def validateType(form, field):
  type = field.data
  if not type:
    raise ValidationError('Please enter an type.')
  if len(type) > 50:
    raise ValidationError('Length of type is too long.')
def validateImage(form, field):
  image = field.data
  if not image:
    raise ValidationError('Please enter an image.')

class RestaurantForm(FlaskForm):
  address = StringField('address', validators=[DataRequired(), Length(max=50), validateAddress])
  city = StringField('city', validators=[DataRequired(), Length(max=50), validateCity])
  state = StringField('state', validators=[DataRequired(), Length(max=50), validateState])
  country = StringField('country', validators=[DataRequired(), Length(max=50), validateCountry])
  lat = FloatField('lat', validators=[DataRequired(), NumberRange(min=-90, max=90), validateLat])
  lng = FloatField('lng', validators=[DataRequired(), NumberRange(min=-180, max=180), validateLng])
  name = StringField('name', validators=[DataRequired(), Length(max=40), validateName])
  type = StringField('type', validators=[DataRequired(), Length(max=40), validateType])
  image = URLField('image', validators=[DataRequired()])
