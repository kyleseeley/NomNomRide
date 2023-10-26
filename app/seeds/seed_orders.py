from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_orders():
    order1 = Order(
        userId=2,
        restaurantId=4,
        total=47.36,
        orderDate=datetime.now(),
    )
    order2 = Order(
        userId=2,
        restaurantId=5,
        total=32.36,
        orderDate=datetime.now(),
    )

    db.session.add(order1)
    db.session.add(order2)
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
