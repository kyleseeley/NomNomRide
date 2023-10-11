from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_menuItems():
    menuItem1 = MenuItem(
        restaurantId=1,
        name="Steak Burrito",
        type="Entrees",
        image="steakburrito.jpg"
    )
    menuItem2 = MenuItem(
        restaurantId=1,
        name="Queso",
        type="Side Dish",
        image="queso.jpg"
    )
    menuItem3 = MenuItem(
        restaurantId=2,
        name="Ribeye Steak",
        type="Entrees",
        image="ribeye.jpg"
    )
    menuItem4 = MenuItem(
        restaurantId=2,
        name="Bloomin Onion",
        type="Appetizer",
        image="bloomin.jpg"
    )
    menuItem5 = MenuItem(
        restaurantId=3,
        name="Burger",
        type="Entrees",
        image="burger.jpg"
    )
    menuItem6 = MenuItem(
        restaurantId=3,
        name="Chocolate Cake",
        type="Dessert",
        image="cake.jpg"
    )

    db.session.add(menuItem1)
    db.session.add(menuItem2)
    db.session.add(menuItem3)
    db.session.add(menuItem4)
    db.session.add(menuItem5)
    db.session.add(menuItem6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_menuItems():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.menuitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menuitems"))

    db.session.commit()
