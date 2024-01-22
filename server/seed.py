from app import app
from models import db, Users, Compliments, Hearts


if __name__ == "__main__":
    with app.app_context():

        print("Clearing data...")
        Users.query.delete()
        Compliments.query.delete()
        Hearts.query.delete()

        print("Starting seed...")

        print("Creating User...")
        user_1 = Users(username="DorahelyS",
                       email="test@gmail.com", position="engineer1")
        user_2 = Users(username="NickS", email="test@gmail.com",
                       position="engineer2")
        user_3 = Users(username="ElijahK",
                       email="test@gmail.com", position="engineer3")
        user_4 = Users(username="ColleenR",
                       email="test@gmail.com", position="engineer4")

        db.session.add_all([user_1, user_2, user_3, user_4])
        db.session.commit()

        print("Creating complments...")
        compliment_1 = Compliments(
            compliment_text="test compliment 1", sender=user_1, public=True, receiver=user_2)
        compliment_2 = Compliments(
            compliment_text="test compliment 2", sender=user_2, public=False, receiver=user_2)
        compliment_3 = Compliments(
            compliment_text="test compliment 3", sender=user_1, public=True, receiver=user_2)
        compliment_4 = Compliments(
            compliment_text="test compliment 4", sender=user_4, public=False, receiver=user_2)

        db.session.add_all([compliment_1, compliment_2,
                           compliment_3, compliment_4])
        db.session.commit()

        print("Creating hearts...")
        heart_1 = Hearts(user_id=1, compliment_id=1)
        heart_2 = Hearts(user_id=2, compliment_id=2)
        heart_3 = Hearts(user_id=3, compliment_id=3)

        db.session.add_all([heart_1, heart_2, heart_3])
        db.session.commit()

        print("Seeding complete...")
