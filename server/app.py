from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource

from config import app, db, api
from models import db



@app.route("/")
def index():
    return "<h1> Server </h1>"




if __name__ == "__main__":
    app.run(port=5555, debug=True)