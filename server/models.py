from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class Compliments(db.Model, SerializerMixin):
    __tablename__ = 'compliments'

    compliment_id = db.Column(db.Integer, primary_key=True)
    compliment_text = db.Column(db.String)
    date_sent = db.Column(db.DateTime, server_default=db.func.now())
    sender_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    public = db.Column(db.Boolean, default=False)

    # relationships
    sender = db.relationship(
        'Users', back_populates='compliments_sent', foreign_keys=[sender_id])

    receiver = db.relationship(
        'Users', back_populates='compliments_received', foreign_keys=[receiver_id])

    serialize_rules = (
        "-sender.compliments_sent",
        "-receiver.compliments_received"
        "-sender.compliments_received",
        "-receiver.compliments_sent"
    )

    @validates('compliment_text')
    def non_null(self, key, value):
        if value:
            return value
        else:
            raise ValueError

    @validates('sender_id', 'receiver_id')
    def non_null_number(self, key, value):
        if value and isinstance(value, int):
            return value
        else:
            raise ValueError("Invalid value for '{}'".format(key))


class Users(db.Model, SerializerMixin):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    position = db.Column(db.String)

    # relationships
    compliments_sent = db.relationship(
        'Compliments', back_populates='sender', foreign_keys=[Compliments.sender_id])

    compliments_received = db.relationship(
        'Compliments', back_populates='receiver', foreign_keys=[Compliments.receiver_id])

    hearts = db.relationship(
        'Hearts', back_populates='user')

    serialize_rules = (
        "-compliments_sent.sender",
        "-compliments_received.receiver",
        "-hearts.user",

    )


class Hearts(db.Model, SerializerMixin):
    __tablename__ = 'hearts'

    heart_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    compliment_id = db.Column(
        db.Integer, db.ForeignKey('compliments.compliment_id'))

    user = db.relationship(
        'Users', back_populates='hearts'
    )

    serialize_rules = ("-user.hearts",)
