from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SelectField
from wtforms.validators import InputRequired, Optional, NumberRange


class AddPet(FlaskForm):

    choices = [('dog', 'dog'), ('cat', 'cat'), ('porchetta', 'porchetta')]

    name = StringField("Name", validators=[InputRequired()])
    species = SelectField("Species", choices=choices, validators=[InputRequired()])
    photo_url = StringField("Photo URL", validators=[Optional()])
    age = IntegerField("Age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = StringField("Notes", validators=[Optional()])
