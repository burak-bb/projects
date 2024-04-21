from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
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
    

class Post(db.Model):

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now().strftime('%Y-%m-%d %H:%M'))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", backref="posts")

    def __repr__ (self):
        return f"<Id= {self.id} Title={self.title} Content={self.content}  Created Date={self.created_at} User Id={self.user_id}>"




