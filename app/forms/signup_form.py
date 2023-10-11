from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
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


class SignUpForm(FlaskForm):
    firstname = StringField("First Name", validators=[
                            DataRequired(), Length(min=2), firstname_data])
    lastname = StringField("Last Name", validators=[
                           DataRequired(), Length(min=2), lastname_data])
    email = StringField('email', validators=[DataRequired(), user_exists])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    address = StringField("Address", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired()])
    state = SelectField("State", validators=[DataRequired()], choices=['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                                                                       'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                                                                       'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                                                                       'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                                                                       'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'])
    lat = FloatField("Latitude", validators=[DataRequired()])
    lng = FloatField("Longitude", validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
