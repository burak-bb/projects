from flask import Flask, render_template, redirect, request, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Feedback
from forms import Users, Login

app = Flask(__name__)

app.config['SECRET_KEY'] = "dxbdjkxnjkaxlakxalkxaxdcwkhchwui"
app.debug = True
toolbar = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
with app.app_context():
    db.create_all()


@app.route("/")
def main_pg():
    return redirect("/register")

@app.route("/register", methods=["GET", "POST"])
def register():
    form = Users()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register(username, password, first_name, last_name)

        db.session.add(new_user)
        db.session.commit()
        session['username'] = username
        return redirect(f"/user/{username}")
    return render_template("register.html", form=form)


@app.route("/login", methods=['GET', 'POST'])
def login():
    form = Login()
    username = form.username.data
    password = form.password.data
    
    print(username)
    user = User.authenticate(username, password)
    if user:
        session['username'] = username
        return redirect(f"/user/{username}")
    return render_template("login.html", form=form)


@app.route("/user/<username>")
def secret(username):
    if session['username'] == username:
        user = User.query.filter_by(username=username).first()
        return render_template("user.html", user=user)
    else:
        return redirect("/")

@app.route("/user/<username>/feedback/add", methods=["POST"])
def add_feedback(username):
    title = request.form.get("title")
    content = request.form.get("content")
    new_feedback = Feedback(title=title, content=content, username=username)
    
    db.session.add(new_feedback)
    db.session.commit()
    return redirect(f"/user/{username}")

@app.route("/users/<username>/delete")
def deleter_user(username):
    if session['username'] == username:
        user = User.query.filter_by(username=username).first
        if user:
            db.session.delete(user)
            db.session.commit()
            return "user deleted"

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")
