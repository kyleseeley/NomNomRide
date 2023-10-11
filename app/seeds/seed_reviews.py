from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        userId=2,
        restaurantId=1,
        review="Great food and excellent service. Will definitely come back!",
        stars=5
    )
    review2 = Review(
        userId=3,
        restaurantId=2,
        review="The food was decent, but the service was slow. Three stars from me.",
        stars=3
    )
    review3 = Review(
        userId=1,
        restaurantId=3,
        review="I had a terrible experience. The food was cold, and the staff was unhelpful. One star.",
        stars=1
    )
    review4 = Review(
        userId=3,
        restaurantId=1,
        review="The restaurant had a cozy atmosphere, and the food was good. Four stars!",
        stars=4
    )
    review5 = Review(
        userId=1,
        restaurantId=2,
        review="Average experience. Nothing exceptional. Two stars.",
        stars=2
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
