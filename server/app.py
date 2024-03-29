#!/usr/bin/env python3

from models import db, Users, Compliments, Hearts
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)


@app.route("/")
def index():
    return "<h1> Server </h1>"


@app.route("/compliments", methods=['GET', 'POST'])
def compliments():

    all_compliments = Compliments.query.all()

    if all_compliments:
        if request.method == 'GET':
            response = make_response(
                [compliment.to_dict(rules=('-receiver_id', '-sender_id', '-receiver.compliments_received', '-sender.compliments_received',))
                 for compliment in all_compliments]
            )
            pass
        elif request.method == 'POST':
            try:
                new_compliment_form = request.get_json()

                new_compliment = Compliments(
                    compliment_text=new_compliment_form.get('compliment_text'),
                    sender_id=new_compliment_form.get('sender_id'),
                    receiver_id=new_compliment_form.get('receiver_id')
                )

                db.session.add(new_compliment)
                db.session.commit()

                response = make_response(
                    new_compliment.to_dict(),
                    201
                )

            except:
                response = make_response(
                    {'error': 'Cannot make new compliment'},
                    500
                )

            pass
    else:
        response = make_response(
            {'error': "No compliments in the DB"},
            404
        )

    return response


@app.route("/compliments/<int:id>", methods=['GET', 'PATCH', 'DELETE'])
def compliments_by_id(id):

    compliment_by_id = Compliments.query.filter(
        Compliments.compliment_id == id).first()

    if compliment_by_id:
        if request.method == 'GET':
            response = make_response(
                compliment_by_id.to_dict(
                    rules=('-receiver_id', '-sender_id', '-receiver.compliments_received', '-sender.compliments_received',)),
                200
            )

        elif request.method == 'PATCH':
            try:
                update_compliment_form = request.get_json()

                for attr in update_compliment_form:
                    setattr(compliment_by_id, attr,
                            update_compliment_form[attr])

                db.session.add(compliment_by_id)
                db.session.commit()

                response = make_response(
                    compliment_by_id.to_dict(),
                    202
                )
            except:
                response = make_response(
                    {'error': 'Cannot update compliment'},
                    405
                )

        elif request.method == 'DELETE':
            try:
                assoc_assets = Hearts.query.filter(
                    Hearts.compliment_id == id).all()

                for del_asset in assoc_assets:
                    db.session.delete(del_asset)

                db.session.delete(compliment_by_id)
                db.session.commit()

                response = make_response(
                    {'success': "Successfully deleted records"},
                    201
                )

            except:
                response = make_response(
                    {'error': 'Cannot delete compliment'},
                    405
                )

            pass
    else:
        response = make_response(
            {'error': "No compliment with that id"},
            404
        )

    return response


@app.route("/hearts", methods=['GET', 'POST'])
def hearts():

    all_hearts = Hearts.query.all()

    if all_hearts:
        if request.method == 'GET':
            response = make_response(
                [heart.to_dict()
                 for heart in all_hearts]
            )
            pass
        elif request.method == 'POST':
            try:
                new_heart_form = request.get_json()

                new_heart = Hearts(
                    compliment_id=new_heart_form.get('compliment_id'),
                    user_id=new_heart_form.get('user_id')
                )

                db.session.add(new_heart)
                db.session.commit()

                response = make_response(
                    new_heart.to_dict(),
                    201
                )

            except:
                response = make_response(
                    {'error': 'Cannot make new heart'},
                    500
                )

            pass
    else:
        response = make_response(
            {'error': "No hearts in the DB"},
            404
        )

    return response


@app.route("/hearts/<int:id>", methods=['GET', 'PATCH', 'DELETE'])
def hearts_by_id(id):

    heart_by_id = Hearts.query.filter(
        Hearts.heart_id == id).first()

    if heart_by_id:
        if request.method == 'GET':
            response = make_response(
                heart_by_id.to_dict(),
                200
            )

        elif request.method == 'PATCH':
            try:
                update_heart_form = request.get_json()

                for attr in update_heart_form:
                    setattr(heart_by_id, attr,
                            update_heart_form[attr])

                db.session.add(heart_by_id)
                db.session.commit()

                response = make_response(
                    heart_by_id.to_dict(),
                    202
                )
            except:
                response = make_response(
                    {'error': 'Cannot update heart'},
                    405
                )

        elif request.method == 'DELETE':
            try:

                db.session.delete(heart_by_id)
                db.session.commit()

                response = make_response(
                    {'success': "Successfully deleted records"},
                    201
                )

            except:
                response = make_response(
                    {'error': 'Cannot delete heart'},
                    405
                )

            pass
    else:
        response = make_response(
            {'error': "No heart with that id"},
            404
        )

    return response


# FULL CRUD FOR USERS

# GET ALL USERS
@app.route('/users', methods = ['GET'])
def all_users():
    try:
        users = Users.query.all()
        users_dict = [user.to_dict(rules = ('-compliments_sent', '-compliments_received', '-hearts')) for user in users]

        response = make_response(
            users_dict,
            200
        )
    except ValueError:
        response = make_response(
            {"error": "objects not found"},
            400
        )
    
    return response

@app.route('/users/<int:id>', methods = ['GET'])
def get_user_by_id(id):
    user = Users.query.filter(Users.user_id == id).first()

    if user:
        response = make_response(
            user.to_dict(rules = ('-compliments_received', '-compliments_sent')),
            200
        )
    
    else:
        response = make_response(
            {"error": "user not found"},
            404
        )
    
    return response
    

@app.route('/users/<int:id>', methods = ['DELETE'])
def delete_by_user_id(id):
    user = Users.query.filter(Users.user_id == id).first()

    if user:
        all_associated_users = Compliments.query.filter((Compliments.sender_id == id) | (Compliments.receiver_id == id)).all()
        for all_associated in all_associated_users:
            db.session.delete(all_associated)
        
        db.session.delete(user)
        db.session.commit()

        response = make_response(
            {},
            204
        )
    
    else:
        response = make_response(
            {"error": "user not found"},
            404
        )
    
    return response

@app.route('/users', methods = ['POST'])
def post_new_user():
    try:
        form_data = request.get_json()

        new_user = Users(
            username = form_data['username'],
            email = form_data['email'],
            position = form_data['position'],
        )

        db.session.add(new_user)
        db.session.commit()

        response = make_response(
            new_user.to_dict(),
            201
        )

    except ValueError:
        response = make_response(
            {"error": "new user not posted"},
            400
        )
        
    return response


@app.route('/users/<int:id>', methods=['PATCH'])
def update_user(id):
    user = Users.query.filter(Users.user_id == id).first()

    if user:
        try:
            form_data = request.get_json()

            for attr in form_data:
                setattr(user, attr, form_data[attr])
            
            db.session.commit()

            response = make_response(
                user.to_dict(),
                201
            )
        
        except ValueError:
            response = make_response(
                {"error": "update did not work"},
                400
            )

    else:
        response = make_response(
            {"error": "user object not found"},
            404
        )
    
    return response


if __name__ == "__main__":
    app.run(port=5555, debug=True)
