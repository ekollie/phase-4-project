from app import app
from models import db

# Here just in case you guys want to use it
from faker import faker

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        #Seed code goe here