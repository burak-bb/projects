from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SelectField, PasswordField
from wtforms.validators import InputRequired, Optional, NumberRange


class Users(FlaskForm):

    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    first_name = StringField("First Name", validators=[InputRequired()])
    last_name = StringField("Last Name", validators=[InputRequired()])


class Login(FlaskForm):

    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])