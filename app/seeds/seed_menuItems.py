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
        image="https://tb-static.uber.com/prod/image-proc/processed_images/98b8ba2dde94440f4cb7537f94f127b9/a19bb09692310dfd41e49a96c424b3a6.jpeg"
    )
    menuItem2 = MenuItem(
        restaurantId=1,
        name="Queso",
        type="Side Dish",
        price=11,
        description="Food",
        image="https://tb-static.uber.com/prod/image-proc/processed_images/e01af377d7b9937677e9217616664418/a19bb09692310dfd41e49a96c424b3a6.jpeg"
    )
    menuItem3 = MenuItem(
        restaurantId=2,
        name="Ribeye Steak",
        type="Entrees",
        price=20,
        description="Food",
        image="https://6666steak.com/cdn/shop/products/BL-Ribeye1.jpg"
    )
    menuItem4 = MenuItem(
        restaurantId=2,
        name="Bloomin Onion",
        type="Appetizer",
        price=15,
        description="Food",
        image="https://olo-images-live.imgix.net/59/59adc004db2f417ba0fa4de6f7d55b0a.jpg"
    )
    menuItem5 = MenuItem(
        restaurantId=3,
        name="Burger",
        type="Entrees",
        price=9,
        description="Food",
        image="https://cdn.culvers.com/menu/category-thumbnail/menu-landing-butterburgers.jpg"
    )
    menuItem6 = MenuItem(
        restaurantId=3,
        name="Chocolate Cake",
        type="Dessert",
        price=11,
        description="Food",
        image="https://joyfoodsunshine.com/wp-content/uploads/2020/08/best-chocolate-cake-recipe-from-scratch-8.jpg"
    )
    menuItem7 = MenuItem(
        restaurantId=4,
        name="Lemon Pepper Wings",
        type="Entrees",
        price=16,
        description="Food",
        image="https://www.thecountrycook.net/wp-content/uploads/2023/05/thumbnail-Lemon-Pepper-Chicken-Wings.jpg"
    )
    menuItem8 = MenuItem(
        restaurantId=5,
        name="Orange Chicken",
        type="Entrees",
        price=7,
        description="Food",
        image="https://insanelygoodrecipes.com/wp-content/uploads/2022/12/Panda_Express_Orange_Chicken_Served_on_Plate-500x375.jpg"
    )
    menuItem9 = MenuItem(
        restaurantId=1,
        name="Burrito Bowl",
        type="Entrees",
        price=12.5,
        description="Food",
        image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMzllMTJjODlhNzE2ZWEyYmYwNzE1MTM0MTBjYWE0Y2UvYTE5YmIwOTY5MjMxMGRmZDQxZTQ5YTk2YzQyNGIzYTYuanBlZw=="
    )
    menuItem10 = MenuItem(
        restaurantId=1,
        name="One Taco",
        type="Entrees",
        price=4.4,
        description="Food",
        image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvNDMyYTQ5ZmIxZDU5M2I1NDkzZDA4NzBmZDRjNjVhYmYvYTE5YmIwOTY5MjMxMGRmZDQxZTQ5YTk2YzQyNGIzYTYuanBlZw=="
    )
    menuItem11 = MenuItem(
        restaurantId=1,
        name="Three Tacos",
        type="Entrees",
        price=12.5,
        description="Food",
        image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvM2Q5ZTAzNGEzMDZhZTVjOGIzN2E0ZTM3MGMyYzdkYzMvYTE5YmIwOTY5MjMxMGRmZDQxZTQ5YTk2YzQyNGIzYTYuanBlZw=="
    )
    menuItem12 = MenuItem(
        restaurantId=1,
        name="Red Pork Asado Plate",
        type="Entrees",
        price=18,
        description="Food",
        image="https://muybuenoblog.com/wp-content/uploads/2020/09/Asado-de-Chile-Colorado.jpg"
    )
    menuItem13 = MenuItem(
        restaurantId=1,
        name="Ground Beef Enchiladas",
        type="Entrees",
        price=23.99,
        description="Food",
        image="https://www.yellowblissroad.com/wp-content/uploads/2020/02/Ground-Beef-Enchiladas-social.jpg"
    )
    menuItem14 = MenuItem(
        restaurantId=1,
        name="Tangy Mexican Slaw",
        type="Side Dish",
        price=5.99,
        description="Food",
        image="https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Mexican-Coleslaw.webp"
    )
    menuItem15 = MenuItem(
        restaurantId=1,
        name="Cinco De Mayo",
        type="Appetizer",
        price=8.99,
        description="Food",
        image="https://hips.hearstapps.com/hmg-prod/images/mexican-appetizers-red-salsa-1585333053.jpg"
    )
    menuItem16 = MenuItem(
        restaurantId=1,
        name="Banana Split",
        type="Appetizer",
        price=9,
        description="Food",
        image="https://www.twopeasandtheirpod.com/wp-content/uploads/2021/07/banana-split-10-650x975.jpg"
    )
    menuItem17 = MenuItem(
        restaurantId=1,
        name="Pork Tacos with Mango Salsa",
        type="Entrees",
        price=10.89,
        description="Food",
        image="https://www.tasteofhome.com/wp-content/uploads/2018/01/Pork-Tacos-with-Mango-Salsa_EXPS_SDDJ17_198169_B08_11_3b-1.jpg"
    )

    db.session.add(menuItem1)
    db.session.add(menuItem2)
    db.session.add(menuItem3)
    db.session.add(menuItem4)
    db.session.add(menuItem5)
    db.session.add(menuItem6)
    db.session.add(menuItem7)
    db.session.add(menuItem8)
    db.session.add(menuItem9)
    db.session.add(menuItem10)
    db.session.add(menuItem11)
    db.session.add(menuItem12)
    db.session.add(menuItem13)
    db.session.add(menuItem14)
    db.session.add(menuItem15)
    db.session.add(menuItem16)
    db.session.add(menuItem17)
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
