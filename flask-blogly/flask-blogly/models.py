from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

default_img_url = "https://i.pinimg.com/280x280_RS/11/94/2b/11942b96795cb8cde3cacfb3121c802f.jpg"


class User(db.Model):

    __tablename__ = "users"

    def __repr__ (self):
        return f"<Id= {self.id} First Name={self.first_name}  Last Name={self.last_name}>"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    img_url = db.Column(db.String, nullable=False, default=default_img_url)
    