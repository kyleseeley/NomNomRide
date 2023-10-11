from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    chipotle = Restaurant(
        ownerId=1,
        address='111 Burrito St',
        city='Denver',
        state='CO',
        country='USA',
        lat=11,
        lng=11,
        name="Chipotle",
        type="Mexican",
        image="burrito.jpg",
        starRating=4.3,
        numReviews=7,
    )
    outback = Restaurant(
        ownerId=2,
        address='222 Bloomin St',
        city='Phoenix',
        state='AZ',
        country='USA',
        lat=21,
        lng=21,
        name="Outback",
        type="American",
        image="steak.jpg",
        starRating=3.1,
        numReviews=5,
    )
    culvers = Restaurant(
        ownerId=3,
        address='333 Burger Ave',
        city='Los Angeles',
        state='CA',
        country='USA',
        lat=31,
        lng=31,
        name="Culvers",
        type="Fast Food",
        image="burger.jpg",
        starRating=4.8,
        numReviews=3,
    )

    db.session.add(chipotle)
    db.session.add(outback)
    db.session.add(culvers)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
