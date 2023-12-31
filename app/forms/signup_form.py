from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, SelectField, FloatField, EmailField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    if current_user.is_authenticated and current_user.email == email:
        user = User.query.filter(User.email == email).all()
        if len(user) > 1:
            raise ValidationError('Email address is already in use.')
    else:
        user = User.query.filter(User.email == email).first()
        if user:
            raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    if current_user.is_authenticated and current_user.username == username:
        user = User.query.filter(User.username == username).all()
        if len(user) > 1:
            raise ValidationError('Username is already in use.')
    else:
        user = User.query.filter(User.username == username).first()
        if user:
            raise ValidationError('Username is already in use.')


def firstname_data(form, field):
    firstname = field.data
    if len(firstname) < 2:
        raise ValidationError(
            "Please enter in a first name with at least 2 characters")


def lastname_data(form, field):
    lastname = field.data
    if len(lastname) < 2:
        raise ValidationError(
            "Please enter in a last name with at least 2 characters")


def address_data(form, field):
    address = field.data
    if not address:
        raise ValidationError("Please enter in an address")


def city_data(form, field):
    city = field.data
    if not city:
        raise ValidationError("Please enter in an city")


def state_data(form, field):
    state = field.data
    if not state:
        raise ValidationError("Please select a state")


def lat_data(form, field):
    lat = field.data
    if not lat:
        raise ValidationError("Please enter in a latitude")


def lng_data(form, field):
    lng = field.data
    if not lng:
        raise ValidationError("Please enter in a longitude")


def password_data(form, field):
    password = field.data
    if not password:
        raise ValidationError("Please enter in a password")


class SignUpForm(FlaskForm):
    firstname = StringField("First Name", validators=[
                            DataRequired(), Length(min=2), firstname_data])
    lastname = StringField("Last Name", validators=[
                           DataRequired(), Length(min=2), lastname_data])
    email = EmailField('email', validators=[
                        DataRequired(), user_exists])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    address = StringField("Address", validators=[DataRequired(), address_data])
    city = StringField("City", validators=[DataRequired(), city_data])
    state = SelectField("State", validators=[DataRequired(), state_data], choices=[
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ])
    lat = FloatField("Latitude", validators=[
                     DataRequired(), NumberRange(min=-90, max=90), lat_data])
    lng = FloatField("Longitude", validators=[
                     DataRequired(), NumberRange(min=-180, max=180), lng_data])
    password = StringField('password', validators=[DataRequired()])
