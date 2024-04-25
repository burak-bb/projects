from flask import Flask, render_template, redirect, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SECRET_KEY'] = "dxbdjkxnjkaxlakxalkxaxdcwkhchwui"
app.debug = True
toolbar = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
with app.app_context():
    db.create_all()

@app.route("/")
def show_cupcakes():
    return render_template("index.html")


@app.route("/api/cupcakes")
def all_cupcake():
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)


@app.route("/api/cupcakes/<int:cupcake_id>")
def single_cupcake(cupcake_id):
    cupcakes = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcakes=cupcakes.serialize())

@app.route("/api/cupcakes", methods=["POST"])
def new_cupcake():
    
    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json["image"] or None

    cupcake = Cupcake(flavor=flavor,size=size,rating=rating,image=image)

    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake=cupcake.serialize())

@app.route("/api/cupcakes/<int:cupcake_id>", methods=["PATCH"])
def edit_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    data = request.json

    cupcake.flavor = data.get("flavor", cupcake.flavor)
    cupcake.size = data.get("size", cupcake.size)
    cupcake.rating = data.get("rating", cupcake.rating)
    cupcake.image = data.get("image", cupcake.image)

    db.session.commit()

    return jsonify(cupcake=cupcake.serialize())


@app.route("/api/cupcakes/<int:cupcake_id>", methods=["DELETE"])
def delete_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="deleted")

