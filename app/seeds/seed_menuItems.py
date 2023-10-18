from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_menuItems():
    menuItem1 = MenuItem(
        restaurantId=1,
        name="Steak Burrito",
        type="Entrees",
        price=10,
        description="Food",
        image="steakburrito.jpg"
    )
    menuItem2 = MenuItem(
        restaurantId=1,
        name="Queso",
        type="Side Dish",
        price=11,
        description="Food",
        image="queso.jpg"
    )
    menuItem3 = MenuItem(
        restaurantId=2,
        name="Ribeye Steak",
        type="Entrees",
        price=20,
        description="Food",
        image="ribeye.jpg"
    )
    menuItem4 = MenuItem(
        restaurantId=2,
        name="Bloomin Onion",
        type="Appetizer",
        price=15,
        description="Food",
        image="bloomin.jpg"
    )
    menuItem5 = MenuItem(
        restaurantId=3,
        name="Burger",
        type="Entrees",
        price=9,
        description="Food",
        image="burger.jpg"
    )
    menuItem6 = MenuItem(
        restaurantId=3,
        name="Chocolate Cake",
        type="Dessert",
        price=11,
        description="Food",
        image="cake.jpg"
    )
    menuItem7 = MenuItem(
        restaurantId=4,
        name="Lemon Pepper Wings",
        type="Entrees",
        price=16,
        description="Food",
        image="wings.jpg"
    )
    menuItem8 = MenuItem(
        restaurantId=5,
        name="Orange Chicken",
        type="Entrees",
        price=7,
        description="Food",
        image="orangechicken.jpg"
    )

    db.session.add(menuItem1)
    db.session.add(menuItem2)
    db.session.add(menuItem3)
    db.session.add(menuItem4)
    db.session.add(menuItem5)
    db.session.add(menuItem6)
    db.session.add(menuItem7)
    db.session.add(menuItem8)
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
