from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)


class Pet(db.Model):

    defaut_image = "https://cdn.myportfolio.com/c728a553-9706-473c-adca-fa2ea3652db5/a124d74e-ff6c-4949-aa4f-ea4d43b71224_rw_1200.jpg?h=2a9066a9cacc857be72862cc4e3beb64"

    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    photo_url = db.Column(db.String, nullable=True, default = defaut_image)
    age = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.String, nullable=True)
    available = db.Column(db.Boolean, nullable=False, default=True)
    

