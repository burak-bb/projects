from flask import Flask, render_template, redirect, request
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPet

app = Flask(__name__)

app.config['SECRET_KEY'] = "dxbdjkxnjkaxlakxalkxaxdcwkhchwui"
app.debug = True
toolbar = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///agency'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
with app.app_context():
    db.create_all()


@app.route("/")
def show_pets():

    pets = Pet.query.all()
    return render_template("base.html", pets=pets)


@app.route("/pet/new", methods=["GET", "POST"])
def new_pet():

    form = AddPet()

    if form.validate_on_submit():

        name = form.name.data

        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data

        new_pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)

        db.session.add(new_pet)
        db.session.commit()

        return redirect("/")

    return render_template("new-pet.html", form=form)


@app.route("/pet/<int:pet_id>")
def pet_details(pet_id):

    pet = Pet.query.get(pet_id)
    return render_template("pet-details.html", pet=pet)