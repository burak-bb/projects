"""Blogly application."""

from flask import Flask, render_template, request, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, default_img_url

app = Flask(__name__)
app.config['SECRET_KEY'] = 'skljdc'
toolbar = DebugToolbarExtension()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True


connect_db(app)

with app.app_context():
    db.create_all()

@app.route("/", methods=["GET"])    
def home_page():

    users = User.query.all()
    return render_template("base.html", users=users)


@app.route("/add-user")
def add_user():
    return render_template("add-profile.html")


@app.route("/new-user", methods=["POST"])
def new_user():

    first_name= request.form.get("first-name")
    last_name= request.form.get("last-name")
    image_url = request.form.get("image-url") or default_img_url
    user = User(first_name=first_name, last_name=last_name, img_url=image_url)
    db.session.add(user)
    db.session.commit()
    return redirect("/")
    

@app.route("/<int:user_id>")
def user_details(user_id):

    user = User.query.get(user_id)
    return render_template("user-detail.html", user=user)


@app.route("/delete-user/<int:user_id>")
def delete_user(user_id):

    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect("/")


@app.route("/edit-user/<int:user_id>")
def edit_user(user_id):

    user = User.query.get(user_id)
    return render_template("edit-user.html", user=user)


@app.route("/save-user/<int:user_id>", methods=["POST"])
def save_user(user_id):

    user = User.query.get(user_id)
    first_name = request.form.get("first-name")
    last_name = request.form.get("last-name")
    img_url = request.form.get("img-url")
    
    user.first_name = first_name
    user.last_name = last_name
    user.img_url = img_url

    db.session.commit()

    return redirect("/")




