from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class Users(db.Model, SerializerMixin):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    position = db.Column(db.String)

    # relationships
    compliments_sent = db.relationship('Compliments', back_populates='sender', foreign_keys='compliments.sender_id')
    compliments_received = db.relationship('Compliments', back_populates='receiver', foreign_keys='compliments.receiver_id')

    #user = db.relationship('Users', back_populates='hearts')
    hearts = db.relationship('Hearts', back_populates='user')

'''
class Compliments(db.Model, SerializerMixin):
    __tablename__ = 'compliments'

    compliment_id = db.Column(db.Integer, primary_key=True)
    compliment_text = db.Column(db.String)
    date_sent = db.Column(db.DateTime, server_default=db.func.now())

    #addng table relationships with foreign key
    sender_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    receiver_id = db.Column(db.Integer,  db.ForeignKey('users.user_id'))

    public = db.Column(db.Boolean)


    # relationships
    sender = db.relationship('User', back_populates='compliments_sent')
    receiver = db.relationship('User', back_populates='compliments_received')
    heart = db.relationship('Hearts', back_populates='compliments')
    
    
    #compliment = db.relationship('Compliments', back_populates='hearts')
    hearts = db.relationship('Hearts', back_populates='compliment')




class Hearts(db.Model, SerializerMixin):
    __tablename__ = 'hearts'

    heart_id = db.Column(db.Integer, primary_key=True)

    #addng table relationships with foreign key
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    compliment_id = db.Column(db.Integer, db.ForeignKey('compliments.compliment_id'))

    #creating ORM relationship which is through the model
    compliment = db.relationship('Compliments', back_populates='hearts')
    user = db.relationship('Users', back_populates='hearts')
'''