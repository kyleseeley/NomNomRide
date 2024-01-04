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
        starRating=4,
        numReviews=2,
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
        starRating=2.5,
        numReviews=2,
    )
    culvers = Restaurant(
        ownerId=3,
        address='333 Burger Ave',
        city='Los Angeles',
        state='CA',
        lat=31,
        lng=31,
        name="Culvers",
        type="Burgers",
        image="https://static.olocdn.net/img/culvers/hero/mobile.png?v=1697229916",
        starRating=2,
        numReviews=1,
    )
    buffaloWildWings = Restaurant(
        ownerId=1,
        address='9876 Lemon Pepper Ct',
        city='Dallas',
        state='TX',
        lat=18,
        lng=18,
        name="Buffalo Wild Wings",
        type="Wings",
        image="https://people.com/thmb/M1feAS2jkiGHy4VB1l0_IqefA0E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(719x571:721x573)/buffalo-wild-wings-246f6cd2919f4d0a905f833ec1fd5326.jpg",
        starRating=3,
        numReviews=1,
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
        starRating=4,
        numReviews=1,
    )
    haiDiLao = Restaurant(
        ownerId=1,
        address='19409 Stevens Creek Blvd Ste 100',
        city='Cupertino',
        state='CA',
        lat=46,
        lng=20,
        name="Haidilao Hot Pot",
        type="Thai",
        image="https://pyxis.nymag.com/v1/imgs/ca4/961/9609a7d81c3f7e40924324d29ea21ebd59-Haidilao-8330.jpg",
        starRating=0,
        numReviews=0,
    )
    mcDonald = Restaurant(
        ownerId=1,
        address='327 S Canal',
        city='Carlsbad',
        state='NM',
        lat=0,
        lng=23,
        name="McDonald's",
        type="Fast Food",
        image="https://m.media-amazon.com/images/I/71kvHIBM2HL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        starRating=0,
        numReviews=0,
    )
    papaJohnPizza = Restaurant(
        ownerId=1,
        address='339724 Cedar Blvd.',
        city='Fremont',
        state='CA',
        lat=-3,
        lng=25,
        name="Papa Johns Pizza",
        type="Pizza",
        image="https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_tM7V4fZBBw8RLmZo0Bi8WhtO2EosTRFD.jpg",
        starRating=0,
        numReviews=0,
    )
    anjapparChettinad = Restaurant(
        ownerId=1,
        address='777 Lawerence Expy Ste8',
        city='Santa Clara',
        state='CA',
        lat=-20,
        lng=15,
        name="Anjappar Chettinad Indian Restaurant",
        type="Indian",
        image="https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg",
        starRating=0,
        numReviews=0,
    )
    kaiSushi = Restaurant(
        ownerId=1,
        address='720 St Michaels Dr,Ste 2M',
        city='Santa Fe',
        state='NM',
        lat=30,
        lng=10,
        name="Kai Sushi&Dining",
        type="Sushi",
        image="https://www.shutterstock.com/image-photo/assorted-sushi-nigiri-maki-big-260nw-1937661397.jpg",
        starRating=0,
        numReviews=0,
    )
    oliveGarden = Restaurant(
        ownerId=3,
        address='3940 S Lamar Blvd',
        city='Austin',
        state='TX',
        lat=30,
        lng=42,
        name="Olive Garden Italian Restaurant",
        type="Italian",
        image="https://t3.ftcdn.net/jpg/02/55/53/44/360_F_255534476_n8JzjZtzOFW5g3TXTLMd6QGVnToi6hqj.jpg",
        starRating=0,
        numReviews=0,
    )
    martinsBBQ = Restaurant(
        ownerId=2,
        address='410 4th Ave S',
        city='Nashville',
        state='TN',
        lat=30,
        lng=42,
        name="Martin's Bar-B-Que Joint",
        type="BBQ",
        image="https://nashvilleguru.com/officialwebsite/wp-content/uploads/2014/03/Martins-BBQ-Belmont-Blvd-Nashville-2.jpg",
        starRating=0,
        numReviews=0,
    )
    nourishCafe = Restaurant(
        ownerId=3,
        address='1030 Hyde St',
        city='San Francisco',
        state='CA',
        lat=10,
        lng=32,
        name="Nourish Cafe",
        type="Vegan",
        image="https://www.nourishcafesf.com/wp-content/uploads/2016/05/Nourish_Hero_Website.jpg",
        starRating=0,
        numReviews=0,
    )
    blimpie = Restaurant(
        ownerId=3,
        address='108 W Hancock St',
        city='Detroit',
        state='MI',
        lat=23,
        lng=37,
        name="Blimpie",
        type="Sandwich",
        image="https://marketing.kahalamgmt.com/assets/uploads/brands/11/defaults/1950938.jpg",
        starRating=0,
        numReviews=0,
    )
    db.session.add(chipotle)
    db.session.add(outback)
    db.session.add(culvers)
    db.session.add(buffaloWildWings)
    db.session.add(pandaExpress)
    db.session.add(haiDiLao)
    db.session.add(papaJohnPizza)
    db.session.add(anjapparChettinad)
    db.session.add(kaiSushi)
    db.session.add(oliveGarden)
    db.session.add(martinsBBQ)
    db.session.add(nourishCafe)
    db.session.add(blimpie)

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
