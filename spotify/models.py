from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(35), nullable=False)
    name = db.Column(db.String(35), nullable=False)
    paasword = db.Column(db.Text, nullable=False)
    


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)