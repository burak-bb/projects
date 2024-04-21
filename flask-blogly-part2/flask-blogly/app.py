"""Blogly application."""

from flask import Flask, render_template, request, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, default_img_url, Post

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
    

@app.route("/<int:user_id>", methods={'GET'})
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



@app.route("/add-post/<int:user_id>", methods=["GET"])
def add_post_pg(user_id):

    user = User.query.get(user_id)

    return render_template("add-post.html", user=user)


@app.route("/add-post/<int:user_id>", methods=["POST", "GET"])
def add_post(user_id):

    title = request.form.get("title")
    content = request.form.get("content")

    user = User.query.get(user_id)
    post = Post(title=title, content=content, user_id=user_id)

    db.session.add(post)
    db.session.commit()
    
    return redirect(f"/{user_id}")


@app.route("/post/<int:post_id>")
def show_post(post_id):

    post = Post.query.get(post_id)

    return render_template("post.html", post=post)


@app.route('/post/edit/<int:post_id>')
def post_edit_pg(post_id):

    return render_template("post-edit.html", post=post_id)



@app.route('/post/edit/<int:post_id>', methods=["POST"])
def post_edit(post_id):

    post = Post.query.get(post_id)

    new_title = request.form.get("title")
    new_content = request.form.get("content")

    post.title = new_title
    post.content = new_content

    db.session.commit()

    return redirect(f"/{post.user.id}")


@app.route("/post/delete/<int:post_id>")
def delete_post(post_id):
    post = Post.query.get(post_id)
    user = post.user.id
    db.session.delete(post)
    db.session.commit()
    return redirect(f"/{user}")