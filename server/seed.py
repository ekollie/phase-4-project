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
            compliment_text="Your compassion is like a soothing balm, offering solace to those in need.", sender=user_1, public=True, receiver=user_2)
        compliment_2 = Compliments(
            compliment_text="The radiance of your smile has the uncanny ability to illuminate even the gloomiest of days.", sender=user_2, public=False, receiver=user_3)
        compliment_3 = Compliments(
            compliment_text="Your optimism is an infectious force, transforming ordinary moments into extraordinary memories.", sender=user_3, public=False, receiver=user_1)
        compliment_4 = Compliments(
            compliment_text="Your boundless creativity crafts a tapestry of brilliance, leaving us in awe of your ingenuity.", sender=user_1, public=True, receiver=user_3)
        compliment_5 = Compliments(
            compliment_text="Intelligence dances in your every gesture, a silent symphony that captivates the minds of those around you.", sender=user_2, public=False, receiver=user_1)
        compliment_6 = Compliments(
            compliment_text="The tapestry of your humor weaves joy into the fabric of our days, creating a mosaic of laughter.", sender=user_3, public=True, receiver=user_2)
        compliment_7 = Compliments(
            compliment_text="Generosity flows from you like a gentle stream, nurturing the hearts fortunate enough to cross your path.", sender=user_1, public=False, receiver=user_2)
        compliment_8 = Compliments(
            compliment_text="Your resilience in the face of adversity is a testament to the indomitable spirit within you.", sender=user_2, public=True, receiver=user_3)
        compliment_9 = Compliments(
            compliment_text="Your zest for life paints each day with vibrant strokes, transforming the mundane into a masterpiece.", sender=user_3, public=False, receiver=user_1)
        compliment_10 = Compliments(
            compliment_text="The wellspring of empathy within you creates an oasis of understanding in a world parched for connection.", sender=user_1, public=True, receiver=user_3)
        compliment_11 = Compliments(
            compliment_text="Your perspective is a kaleidoscope, refracting brilliance into every conversation and encounter.", sender=user_2, public=False, receiver=user_1)
        compliment_12 = Compliments(
            compliment_text="The metamorphosis of your personal growth is a captivating journey, evolving into a tapestry of strength and wisdom.", sender=user_4, public=True, receiver=user_2)

        db.session.add_all([
            compliment_1, 
            compliment_2,
            compliment_3, 
            compliment_4,
            compliment_5,
            compliment_6,
            compliment_7,
            compliment_8,
            compliment_9,
            compliment_10,
            compliment_11,
            compliment_12,
                        ])
        db.session.commit()

        print("Creating hearts...")
        heart_1 = Hearts(compliment_id=-1)

        db.session.add_all([heart_1])
        db.session.commit()

        print("Seeding complete...")
