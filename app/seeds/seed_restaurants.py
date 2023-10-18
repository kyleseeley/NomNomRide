from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    chipotle = Restaurant(
        ownerId=1,
        address='111 Burrito St',
        city='Denver',
        state='CO',
        lat=11,
        lng=11,
        name="Chipotle",
        type="Mexican",
        image="https://www.godairyfree.org/wp-content/uploads/2007/10/fast-food-chipotle.jpg",
        starRating=4.3,
        numReviews=7,
    )
    outback = Restaurant(
        ownerId=2,
        address='222 Bloomin St',
        city='Phoenix',
        state='AZ',
        lat=21,
        lng=21,
        name="Outback",
        type="American",
        image="https://www.sheknows.com/wp-content/uploads/2018/08/lb4x7ie5udr8uaz9kb3r.jpeg",
        starRating=3.1,
        numReviews=5,
    )
    culvers = Restaurant(
        ownerId=3,
        address='333 Burger Ave',
        city='Los Angeles',
        state='CA',
        lat=31,
        lng=31,
        name="Culvers",
        type="Fast Food",
        image="https://static.olocdn.net/img/culvers/hero/mobile.png?v=1697229916",
        starRating=4.8,
        numReviews=3,
    )
    buffaloWildWings = Restaurant(
        ownerId=1,
        address='9876 Lemon Pepper Ct',
        city='Dallas',
        state='TX',
        lat=18,
        lng=18,
        name="Buffalo Wild Wings",
        type="American",
        image="https://people.com/thmb/M1feAS2jkiGHy4VB1l0_IqefA0E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(719x571:721x573)/buffalo-wild-wings-246f6cd2919f4d0a905f833ec1fd5326.jpg",
        starRating=3.2,
        numReviews=9,
    )
    pandaExpress = Restaurant(
        ownerId=2,
        address='4477 Orange Chicken Cir',
        city='Tampa Bay',
        state='FL',
        lat=43,
        lng=43,
        name="Panda Express",
        type="Chinese",
        image="https://www.mashed.com/img/gallery/panda-express-may-have-a-new-chicken-offering-on-the-menu-soon/l-intro-1660604759.jpg",
        starRating=2.9,
        numReviews=3,
    )

    db.session.add(chipotle)
    db.session.add(outback)
    db.session.add(culvers)
    db.session.add(buffaloWildWings)
    db.session.add(pandaExpress)
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
