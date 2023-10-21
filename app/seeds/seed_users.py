from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname='Demo',
        lastname='User',
        email='demo@aa.io',
        username='Demo',
        address='123 Main St',
        city='Denver',
        state='CO',
        lat=10,
        lng=10,
        password='password')
    marnie = User(
        firstname='Marnie',
        lastname='Jenkins',
        email='marnie@aa.io',
        username='marnie',
        address='456 Lincoln St',
        city='Phoenix',
        state='AZ',
        lat=20,
        lng=20,
        password='password')
    bobbie = User(
        firstname='Bobbie',
        lastname='Turner',
        email='bobbie@aa.io',
        username='bobbie',
        address='789 Rodeo Dr',
        city='Los Angeles',
        state='CA',
        lat=30,
        lng=30,
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
