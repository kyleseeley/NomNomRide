from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_menuItems():
    # menuItem1 = MenuItem(
    #     restaurantId=1,
    #     name="Steak Burrito",
    #     type="Entrees",
    #     price=10,
    #     description="Food",
    #     image="https://tb-static.uber.com/prod/image-proc/processed_images/98b8ba2dde94440f4cb7537f94f127b9/a19bb09692310dfd41e49a96c424b3a6.jpeg"
    # )
    # menuItem2 = MenuItem(
    #     restaurantId=1,
    #     name="Queso",
    #     type="Side Dish",
    #     price=11,
    #     description="Food",
    #     image="https://tb-static.uber.com/prod/image-proc/processed_images/e01af377d7b9937677e9217616664418/a19bb09692310dfd41e49a96c424b3a6.jpeg"
    # )
    # menuItem3 = MenuItem(
    #     restaurantId=2,
    #     name="Ribeye Steak",
    #     type="Entrees",
    #     price=20,
    #     description="Food",
    #     image="https://6666steak.com/cdn/shop/products/BL-Ribeye1.jpg"
    # )
    # menuItem4 = MenuItem(
    #     restaurantId=2,
    #     name="Bloomin Onion",
    #     type="Appetizer",
    #     price=15,
    #     description="Food",
    #     image="https://olo-images-live.imgix.net/59/59adc004db2f417ba0fa4de6f7d55b0a.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=528&h=352&fit=fill&fm=png32&bg=transparent&s=7e011b87f444f48718d653741454cb7a"
    # )
    # menuItem5 = MenuItem(
    #     restaurantId=3,
    #     name="Burger",
    #     type="Entrees",
    #     price=9,
    #     description="Food",
    #     image="https://cdn.culvers.com/menu/category-thumbnail/menu-landing-butterburgers.jpg"
    # )
    # menuItem6 = MenuItem(
    #     restaurantId=3,
    #     name="Chocolate Cake",
    #     type="Dessert",
    #     price=11,
    #     description="Food",
    #     image="https://joyfoodsunshine.com/wp-content/uploads/2020/08/best-chocolate-cake-recipe-from-scratch-8.jpg"
    # )
    # menuItem7 = MenuItem(
    #     restaurantId=4,
    #     name="Lemon Pepper Wings",
    #     type="Entrees",
    #     price=16,
    #     description="Food",
    #     image="https://www.thecountrycook.net/wp-content/uploads/2023/05/thumbnail-Lemon-Pepper-Chicken-Wings.jpg"
    # )
    # menuItem8 = MenuItem(
    #     restaurantId=5,
    #     name="Orange Chicken",
    #     type="Entrees",
    #     price=7,
    #     description="Food",
    #     image="https://insanelygoodrecipes.com/wp-content/uploads/2022/12/Panda_Express_Orange_Chicken_Served_on_Plate-500x375.jpg"
    # )
    # menuItem9 = MenuItem(
    #     restaurantId=1,
    #     name="Burrito Bowl",
    #     type="Entrees",
    #     price=12.5,
    #     description="Food",
    #     image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMzllMTJjODlhNzE2ZWEyYmYwNzE1MTM0MTBjYWE0Y2UvYTE5YmIwOTY5MjMxMGRmZDQxZTQ5YTk2YzQyNGIzYTYuanBlZw=="
    # )
    # menuItem10 = MenuItem(
    #     restaurantId=1,
    #     name="One Taco",
    #     type="Entrees",
    #     price=4.4,
    #     description="Food",
    #     image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvNDMyYTQ5ZmIxZDU5M2I1NDkzZDA4NzBmZDRjNjVhYmYvYTE5YmIwOTY5MjMxMGRmZDQxZTQ5YTk2YzQyNGIzYTYuanBlZw=="
    # )
    # menuItem11 = MenuItem(
    #     restaurantId=1,
    #     name="Three Tacos",
    #     type="Entrees",
    #     price=12.5,
    #     description="Food",
    #     image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvM2Q5ZTAzNGEzMDZhZTVjOGIzN2E0ZTM3MGMyYzdkYzMvYTE5YmIwOTY5MjMxMGRmZDQxZTQ5YTk2YzQyNGIzYTYuanBlZw=="
    # )
    # menuItem12 = MenuItem(
    #     restaurantId=1,
    #     name="Red Pork Asado Plate",
    #     type="Entrees",
    #     price=18,
    #     description="Food",
    #     image="https://muybuenoblog.com/wp-content/uploads/2020/09/Asado-de-Chile-Colorado.jpg"
    # )
    # menuItem13 = MenuItem(
    #     restaurantId=1,
    #     name="Ground Beef Enchiladas",
    #     type="Entrees",
    #     price=23.99,
    #     description="Food",
    #     image="https://www.yellowblissroad.com/wp-content/uploads/2020/02/Ground-Beef-Enchiladas-social.jpg"
    # )
    # menuItem14 = MenuItem(
    #     restaurantId=1,
    #     name="Tangy Mexican Slaw",
    #     type="Side Dish",
    #     price=5.99,
    #     description="Food",
    #     image="https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Mexican-Coleslaw.webp"
    # )
    # menuItem15 = MenuItem(
    #     restaurantId=1,
    #     name="Cinco De Mayo",
    #     type="Appetizer",
    #     price=8.99,
    #     description="Food",
    #     image="https://hips.hearstapps.com/hmg-prod/images/mexican-appetizers-red-salsa-1585333053.jpg"
    # )
    # menuItem16 = MenuItem(
    #     restaurantId=1,
    #     name="Banana Split",
    #     type="Appetizer",
    #     price=9,
    #     description="Food",
    #     image="https://www.twopeasandtheirpod.com/wp-content/uploads/2021/07/banana-split-10-650x975.jpg"
    # )
    # menuItem17 = MenuItem(
    #     restaurantId=1,
    #     name="Pork Tacos with Mango Salsa",
    #     type="Entrees",
    #     price=10.89,
    #     description="Food",
    #     image="https://www.tasteofhome.com/wp-content/uploads/2018/01/Pork-Tacos-with-Mango-Salsa_EXPS_SDDJ17_198169_B08_11_3b-1.jpg"
    # )
    # menuItem18 = MenuItem(
    #     restaurantId=2,
    #     name="Filet Mignon & Lobster",
    #     type="Entrees",
    #     price=38.99,
    #     description="tender / juicy / thick cut / steamed or grilled lobster tail",
    #     image="https://outbackmenus.com/231108/OPOWSW2_2_1123-W4H_OWSW2/bg5.png"
    # )
    # menuItem19 = MenuItem(
    #     restaurantId=2,
    #     name="Seared Peppered Ahi",
    #     type="Appetizer",
    #     price=18.49,
    #     description="seared rare / garlic pepper seasoning / creamy ginger",
    #     image="https://outbackmenus.com/231108/OPOWSW2_2_1123-W4H_OWSW2/bg3.png"
    # )
    # menuItem20 = MenuItem(
    #     restaurantId=2,
    #     name="House Salad",
    #     type="Side Dish",
    #     price=6.49,
    #     description="Fresh mixed greens, dressing of choice, cucumbers, Monterey Jack and Cheddar cheese, tomatoes, red onions and homemade croutons",
    #     image="https://olo-images-live.imgix.net/a9/a9c186c0478c4bba8a6a880e21a4c1da.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=528&h=352&fit=fill&fm=png32&bg=transparent&s=e896118708d5d83a45d8376ef4ed701e"
    # )
    # menuItem21 = MenuItem(
    #     restaurantId=2,
    #     name="House Salad",
    #     type="Side Dish",
    #     price=6.49,
    #     description="Fresh mixed greens, dressing of choice, cucumbers, Monterey Jack and Cheddar cheese, tomatoes, red onions and homemade croutons",
    #     image="https://olo-images-live.imgix.net/a9/a9c186c0478c4bba8a6a880e21a4c1da.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=528&h=352&fit=fill&fm=png32&bg=transparent&s=e896118708d5d83a45d8376ef4ed701e"
    # )
    # menuItem22 = MenuItem(
    #     restaurantId=2,
    #     name="Steakhouse Mac & Cheese",
    #     type="Side Dish",
    #     price=6.49,
    #     description="Delicious creamy Mac and Cheese",
    #     image="https://olo-images-live.imgix.net/8f/8f1c283be873481da88f963c337dc99a.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=528&h=352&fit=fill&fm=png32&bg=transparent&s=20d78fcd4f82fdf910982662290a85d0"
    # )
    # menuItem23 = MenuItem(
    #     restaurantId=3,
    #     name="Spicy Crispy Chicken Sandwich",
    #     type="Entrees",
    #     price=8.49,
    #     description="The Spicy Crispy Chicken Sandwich is made with the same premium chicken you know and love, breaded with a four-pepper blend of spices for the perfect level of heat.",
    #     image="https://cdn.culvers.com/menu/images/item/chicken-sandwiches/chicken/spicy-crispy-chicken-sandwich.png?q=90&w=800&format=auto"
    # )
    # menuItem24 = MenuItem(
    #     restaurantId=3,
    #     name="Wisconsin Cheese Curds",
    #     type="Side Dish",
    #     price=3.99,
    #     description="Our cheese curds are a dairyland delicacy. Made using the freshest, un-aged yellow and white Wisconsin cheddar cheese, deep-fried golden brown for a warm buttery crunch.",
    #     image="https://cdn.culvers.com/menu/images/item/sides/cheese-curds.png?q=90&w=800&format=auto"
    # )
    # menuItem25 = MenuItem(
    #     restaurantId=3,
    #     name="Pretzel Bites",
    #     type="Side Dish",
    #     price=3.99,
    #     description="Crispy on the outside and chewy on the inside, Pretzel Bites are the ultimate snacking experience. They’re served hot with Wisconsin Cheddar Cheese Sauce.",
    #     image="https://cdn.culvers.com/menu/images/item/sides/pretzel-bites-cheese.png?q=90&w=800&format=auto"
    # )
    # menuItem26 = MenuItem(
    #     restaurantId=4,
    #     name="2 Honey BBQ Bird Dawgs + Fries",
    #     type="Entrees",
    #     price=17.99,
    #     description="HAND-BREADED CHICKEN TENDERS / NATURAL-CUT FRENCH FRIES / SLAW / HONEY BBQ SAUCE / RANCH / GREEN ONIONS / BRIOCHE BUNS / INCLUDES 2 DAWGS / NATURAL-CUT FRENCH FRIES",
    #     image="https://images.ctfassets.net/l5fkpck1mwg3/3RqEehKdx0gQa341GTAF6n/38d536d184e424665bd15eaefe8fa4d2/DEL2022-634951-Bird-Dawgs_BirdDawgs_2up_HoneyBBQ_FF2_39_nShdw_4000x3000.png?fm=avif&w=500&q=80"
    # )
    # menuItem27 = MenuItem(
    #     restaurantId=4,
    #     name="Loaded Ice Cream",
    #     type="Dessert",
    #     price=9.99,
    #     description="VANILLA ICE CREAM / CHOCOLATE SAUCE / CARAMEL SAUCE / CINNAMON-SUGAR / TORTILLA STRIPS",
    #     image="https://images.ctfassets.net/l5fkpck1mwg3/4iQ8pziiW1pXkpVVBbSSWN/25d2de6298e197cd9220113567ff4b6c/Dessert_Loaded_Ice_Cream.png?fm=avif&w=500&q=80"
    # )
    # menuItem28 = MenuItem(
    #     restaurantId=4,
    #     name="Beer-Battered Onion Rings",
    #     type="Side Dish",
    #     price=9.99,
    #     description="THICK-CUT ONION RINGS / BEER BATTER / SOUTHWESTERN RANCH",
    #     image="https://images.ctfassets.net/l5fkpck1mwg3/jXsq72HlveX0b9AynjXCc/acccc5cc8c17961dee220c98317843ea/DEL2022-601341-Appetizers_Beer-Battered-Onion-Rings_50_4000x3000.png?fm=avif&w=500&q=80"
    # )

    # db.session.add(menuItem1)
    # db.session.add(menuItem2)
    # db.session.add(menuItem3)
    # db.session.add(menuItem4)
    # db.session.add(menuItem5)
    # db.session.add(menuItem6)
    # db.session.add(menuItem7)
    # db.session.add(menuItem8)
    # db.session.add(menuItem9)
    # db.session.add(menuItem10)
    # db.session.add(menuItem11)
    # db.session.add(menuItem12)
    # db.session.add(menuItem13)
    # db.session.add(menuItem14)
    # db.session.add(menuItem15)
    # db.session.add(menuItem16)
    # db.session.add(menuItem17)
    # db.session.add(menuItem18)
    # db.session.add(menuItem19)
    # db.session.add(menuItem20)
    # db.session.add(menuItem21)
    # db.session.add(menuItem22)
    # db.session.add(menuItem23)
    # db.session.add(menuItem24)
    # db.session.add(menuItem25)
    # db.session.add(menuItem26)
    # db.session.add(menuItem27)
    # db.session.add(menuItem28)
    # db.session.commit()

    menu_items_data = [
        {
            "restaurantId": 1,
            "name": "Steak Burrito",
            "type": "Entrees",
            "price": 10,
            "description": "Food",
            "image": "https://tb-static.uber.com/prod/image-proc/processed_images/98b8ba2dde94440f4cb7537f94f127b9/a19bb09692310dfd41e49a96c424b3a6.jpeg"
        },
        {
            "restaurantId": 1,
            "name": "Queso",
            "type": "Side Dish",
            "price": 11,
            "description": "Food",
            "image": "https://tb-static.uber.com/prod/image-proc/processed_images/e01af377d7b9937677e9217616664418/a19bb09692310dfd41e49a96c424b3a6.jpeg"
        },
        {
            "restaurantId": 1,
            "name": "Burrito Bowl",
            "type": "Entrees",
            "price": 12.5,
            "description": "Food",
            "image": "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMzllMTJjODlhNzE2ZWEyYmYwNzE1MTM0MTBjYWE0Y2UvYTE5YmIwOTY5MjMxMGRmZDQxZTQ5YTk2YzQyNGIzYTYuanBlZw=="
        },
        {
            "restaurantId": 1,
            "name": "One Taco",
            "type": "Entrees",
            "price": 4.49,
            "description": "Food",
            "image": "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvNDMyYTQ5ZmIxZDU5M2I1NDkzZDA4NzBmZDRjNjVhYmYvYTE5YmIwOTY5MjMxMGRmZDQxZTQ5YTk2YzQyNGIzYTYuanBlZw=="
        },
        {
            "restaurantId": 1,
            "name": "Three Tacos",
            "type": "Entrees",
            "price": 12.50,
            "description": "Food",
            "image": "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvM2Q5ZTAzNGEzMDZhZTVjOGIzN2E0ZTM3MGMyYzdkYzMvYTE5YmIwOTY5MjMxMGRmZDQxZTQ5YTk2YzQyNGIzYTYuanBlZw=="
        },
        {
            "restaurantId": 1,
            "name": "Red Pork Asado Plate",
            "type": "Entrees",
            "price": 18,
            "description": "Food",
            "image": "https://muybuenoblog.com/wp-content/uploads/2020/09/Asado-de-Chile-Colorado.jpg"
        },
        {
            "restaurantId": 1,
            "name": "Ground Beef Enchiladas",
            "type": "Entrees",
            "price": 23.99,
            "description": "Food",
            "image": "https://www.yellowblissroad.com/wp-content/uploads/2020/02/Ground-Beef-Enchiladas-social.jpg"
        },
        {
            "restaurantId": 1,
            "name": "Tangy Mexican Slaw",
            "type": "Side Dish",
            "price": 5.99,
            "description": "Food",
            "image": "https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Mexican-Coleslaw.webp"
        },
        {
            "restaurantId": 1,
            "name": "Cinco De Mayo",
            "type": "Appetizer",
            "price": 8.99,
            "description": "Food",
            "image": "https://hips.hearstapps.com/hmg-prod/images/mexican-appetizers-red-salsa-1585333053.jpg"
        },
        {
            "restaurantId": 1,
            "name": "Banana Split",
            "type": "Dessert",
            "price": 9,
            "description": "Food",
            "image": "https://www.twopeasandtheirpod.com/wp-content/uploads/2021/07/banana-split-10-650x975.jpg"
        },
        {
            "restaurantId": 1,
            "name": "Pork Tacos with Mango Salsa",
            "type": "Entrees",
            "price": 10.89,
            "description": "Food",
            "image": "https://www.tasteofhome.com/wp-content/uploads/2018/01/Pork-Tacos-with-Mango-Salsa_EXPS_SDDJ17_198169_B08_11_3b-1.jpg"
        },
        {
            "restaurantId": 2,
            "name": "Ribeye Steak",
            "type": "Entrees",
            "price": 21.99,
            "description": "Food",
            "image": "https://6666steak.com/cdn/shop/products/BL-Ribeye1.jpg"
        },
        {
            "restaurantId": 2,
            "name": "Bloomin Onion",
            "type": "Appetizer",
            "price": 14.99,
            "description": "Food",
            "image": "https://olo-images-live.imgix.net/59/59adc004db2f417ba0fa4de6f7d55b0a.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=528&h=352&fit=fill&fm=png32&bg=transparent&s=7e011b87f444f48718d653741454cb7a"
        },
        {
            "restaurantId": 2,
            "name": "Filet Mignon & Lobster",
            "type": "Entrees",
            "price": 38.99,
            "description": "tender / juicy / thick cut / steamed or grilled lobster tail",
            "image": "https://outbackmenus.com/231108/OPOWSW2_2_1123-W4H_OWSW2/bg5.png"
        },
        {
            "restaurantId": 2,
            "name": "Seared Peppered Ahi",
            "type": "Appetizer",
            "price": 18.49,
            "description": "seared rare / garlic pepper seasoning / creamy ginger",
            "image": "https://outbackmenus.com/231108/OPOWSW2_2_1123-W4H_OWSW2/bg3.png"
        },
        {
            "restaurantId": 2,
            "name": "House Salad",
            "type": "Side Dish",
            "price": 6.49,
            "description": "Fresh mixed greens, dressing of choice, cucumbers, Monterey Jack and Cheddar cheese, tomatoes, red onions and homemade croutons",
            "image": "https://olo-images-live.imgix.net/a9/a9c186c0478c4bba8a6a880e21a4c1da.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=528&h=352&fit=fill&fm=png32&bg=transparent&s=e896118708d5d83a45d8376ef4ed701e"
        },
        {
            "restaurantId": 2,
            "name": "Steakhouse Mac & Cheese",
            "type": "Side Dish",
            "price": 6.49,
            "description": "Delicious creamy Mac and Cheese",
            "image": "https://olo-images-live.imgix.net/8f/8f1c283be873481da88f963c337dc99a.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=528&h=352&fit=fill&fm=png32&bg=transparent&s=20d78fcd4f82fdf910982662290a85d0"
        },
        {
            "restaurantId": 3,
            "name": "Burger",
            "type": "Entrees",
            "price": 8.99,
            "description": "Food",
            "image": "https://cdn.culvers.com/menu/category-thumbnail/menu-landing-butterburgers.jpg"
        },
        {
            "restaurantId": 3,
            "name": "Spicy Crispy Chicken Sandwich",
            "type": "Entrees",
            "price": 8.49,
            "description": "The Spicy Crispy Chicken Sandwich is made with the same premium chicken you know and love, breaded with a four-pepper blend of spices for the perfect level of heat.",
            "image": "https://cdn.culvers.com/menu/images/item/chicken-sandwiches/chicken/spicy-crispy-chicken-sandwich.png?q=90&w=800&format=auto"
        },
        {
            "restaurantId": 3,
            "name": "Wisconsin Cheese Curds",
            "type": "Side Dish",
            "price": 3.99,
            "description": "Our cheese curds are a dairyland delicacy. Made using the freshest, un-aged yellow and white Wisconsin cheddar cheese, deep-fried golden brown for a warm buttery crunch.",
            "image": "https://cdn.culvers.com/menu/images/item/sides/cheese-curds.png?q=90&w=800&format=auto"
        },
        {
            "restaurantId": 3,
            "name": "Pretzel Bites",
            "type": "Side Dish",
            "price": 3.99,
            "description": "Crispy on the outside and chewy on the inside, Pretzel Bites are the ultimate snacking experience. They’re served hot with Wisconsin Cheddar Cheese Sauce.",
            "image": "https://cdn.culvers.com/menu/images/item/sides/pretzel-bites-cheese.png?q=90&w=800&format=auto"
        },
        {
            "restaurantId": 4,
            "name": "Lemon Pepper Wings",
            "type": "Entrees",
            "price": 16,
            "description": "Food",
            "image": "https://www.thecountrycook.net/wp-content/uploads/2023/05/thumbnail-Lemon-Pepper-Chicken-Wings.jpg"
        },
        {
            "restaurantId": 4,
            "name": "2 Honey BBQ Bird Dawgs + Fries",
            "type": "Entrees",
            "price": 17.99,
            "description": "Food",
            "image": "https://images.ctfassets.net/l5fkpck1mwg3/3RqEehKdx0gQa341GTAF6n/38d536d184e424665bd15eaefe8fa4d2/DEL2022-634951-Bird-Dawgs_BirdDawgs_2up_HoneyBBQ_FF2_39_nShdw_4000x3000.png?fm=avif&w=500&q=80"
        },
        {
            "restaurantId": 4,
            "name": "Loaded Ice Cream",
            "type": "Dessert",
            "price": 9.99,
            "description": "Food",
            "image": "https://images.ctfassets.net/l5fkpck1mwg3/4iQ8pziiW1pXkpVVBbSSWN/25d2de6298e197cd9220113567ff4b6c/Dessert_Loaded_Ice_Cream.png?fm=avif&w=500&q=80"
        },
        {
            "restaurantId": 4,
            "name": "Beer-Battered Onion Rings",
            "type": "Side Dish",
            "price": 9.99,
            "description": "Food",
            "image": "https://images.ctfassets.net/l5fkpck1mwg3/jXsq72HlveX0b9AynjXCc/acccc5cc8c17961dee220c98317843ea/DEL2022-601341-Appetizers_Beer-Battered-Onion-Rings_50_4000x3000.png?fm=avif&w=500&q=80"
        },
        {
            "restaurantId": 5,
            "name": "Orange Chicken",
            "type": "Entrees",
            "price": 8.99,
            "description": "Food",
            "image": "https://insanelygoodrecipes.com/wp-content/uploads/2022/12/Panda_Express_Orange_Chicken_Served_on_Plate-500x375.jpg"
        },
        {
            "restaurantId": 5,
            "name": "Honey Sesame Chicken",
            "type": "Entrees",
            "price": 8.99,
            "description": "Food",
            "image": "https://s3.amazonaws.com/panda-express-international/Canada/HSC_CA.jpg"
        },
        {
            "restaurantId": 5,
            "name": "Chow Mein",
            "type": "Entrees",
            "price": 3.99,
            "description": "Food",
            "image": "https://palatablepastime.com/wp-content/uploads/2022/05/copycat-panda-express-chow-mein-sq.jpg"
        },
        {
            "restaurantId": 5,
            "name": "Fortune Cookies",
            "type": "Dessert",
            "price": 1.99,
            "description": "Food",
            "image": "https://resources.childrensmiraclenetworkhospitals.org/uswebsite-media/sites/121/2017/12/panda_express_fortune_cookie_box.jpg"
        },
        {
            "restaurantId": 6,
            "name": "Kurobuta Pork Shoulder",
            "type": "Entrees",
            "price": 8.99,
            "description": "Food",
            "image": "https://cdn-global-website.superhi-cdn.com/website/image/11918fa71e8746ff88882a22871ff3ab-396-543.jpg"
        },
        {
            "restaurantId": 6,
            "name": "Angus Brisket",
            "type": "Entrees",
            "price": 10.99,
            "description": "Food",
            "image": "https://cdn-global-website.superhi-cdn.com/website/image/075307017b96440a9a66f0a3aad3aaa7-396-543.jpg"
        },
        {
            "restaurantId": 6,
            "name": "Egg Fried Rice",
            "type": "Side Dish",
            "price": 3.99,
            "description": "Food",
            "image": "https://cdn-global-website.superhi-cdn.com/website/image/0e572bdfd9c14fe18f301e690671da8b-396-543.jpg"
        },
        {
            "restaurantId": 6,
            "name": "Sichuan Crispy Pork",
            "type": "Side Dish",
            "price": 5.99,
            "description": "Food",
            "image": "https://cdn-global-website.superhi-cdn.com/website/image/2311ce77b8ad4c40a86c97bd0348d840-396-543.jpg"
        },
        {
            "restaurantId": 7,
            "name": "Epic Stuffed Crust",
            "type": "Entrees",
            "price": 14.99,
            "description": "Food",
            "image": "https://www.papajohns.com/static-assets/a/images/web/product/pizzas/2022_P5_EPSC_Menu-compressed.jpg"
        },
        {
            "restaurantId": 7,
            "name": "XL New York Style Crust",
            "type": "Entrees",
            "price": 13.99,
            "description": "Food",
            "image": "https://www.papajohns.com/assets/img/pizzas/xl-new-york-1.jpg"
        },
        {
            "restaurantId": 7,
            "name": "Parmesan Crusted Philly Cheesesteak Papadia",
            "type": "Entrees",
            "price": 8.99,
            "description": "Food",
            "image": "https://www.papajohns.com/static-assets/a/images/web/product/papadias/Parm_Crusted_Papadia-Philly_89218.jpg"
        },
        {
            "restaurantId": 7,
            "name": "Jalapeno Papa Bites",
            "type": "Entrees",
            "price": 6.99,
            "description": "Food",
            "image": "https://www.papajohns.com/static-assets/a/images/web/product/papa-bites/P1_2023-Jalapeno-Papa_Bites-Menu-91521.jpg"
        },
        {
            "restaurantId": 8,
            "name": "Rasam",
            "type": "Appetizer",
            "price": 6.99,
            "description": "Food",
            "image": "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/01/rasam.jpg"
        },
        {
            "restaurantId": 8,
            "name": "Kali Mirchi Kabab",
            "type": "Entrees",
            "price": 12.99,
            "description": "Food",
            "image": "https://i.ytimg.com/vi/WMh0CPpLndA/maxresdefault.jpg"
        },
        {
            "restaurantId": 8,
            "name": "Tandoori Chicken Full",
            "type": "Entrees",
            "price": 13.49,
            "description": "Food",
            "image": "https://www.onceuponachef.com/images/2015/01/tandoori-chicken-1.jpg"
        },
        {
            "restaurantId": 8,
            "name": "Garlic Naan",
            "type": "Side Dish",
            "price": 13.49,
            "description": "Food",
            "image": "https://www.kitchensanctuary.com/wp-content/uploads/2021/03/Garlic-Naan-square-FS-42.jpg"
        },
        {
            "restaurantId": 9,
            "name": "Edamame",
            "type": "Appetizer",
            "price": 5.49,
            "description": "Food",
            "image": "https://www.inspiredtaste.net/wp-content/uploads/2020/03/Spicy-Edamame-Recipe-1200.jpg"
        },
        {
            "restaurantId": 9,
            "name": "Salmmon Roll",
            "type": "Entrees",
            "price": 8.99,
            "description": "Food",
            "image": "https://secretsofsushi.com/wp-content/uploads/2014/07/Salmon_Roll_web.jpg"
        },
        {
            "restaurantId": 9,
            "name": "Spicy Tuna Roll",
            "type": "Entrees",
            "price": 8.99,
            "description": "Food",
            "image": "https://www.tiger-corporation.com/wp-content/uploads/2023/02/hero-img-recipe-spicy-tuna-3db6e125056f2bde01321a3da5d290da.jpg"
        },
        {
            "restaurantId": 9,
            "name": "Mochi Ice Cream",
            "type": "Dessert",
            "price": 3.99,
            "description": "Food",
            "image": "https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-034.jpg"
        },
        {
            "restaurantId": 10,
            "name": "Chicken Parmigiana",
            "type": "Entrees",
            "price": 16.99,
            "description": "Food",
            "image": "https://media.olivegarden.com/en_us/images/product/dinner-chicken-parm-dpv-590x365.jpg"
        },
        {
            "restaurantId": 10,
            "name": "Tour of Italy",
            "type": "Entrees",
            "price": 15.99,
            "description": "Food",
            "image": "https://media.olivegarden.com/en_us/images/product/Tour-of-Italy-gv-590X365.jpg"
        },
        {
            "restaurantId": 10,
            "name": "Calamari",
            "type": "Appetizer",
            "price": 9.99,
            "description": "Food",
            "image": "https://media.olivegarden.com/en_us/images/product/calamari-dpv-590x365.jpg"
        },
        {
            "restaurantId": 10,
            "name": "Breadsticks",
            "type": "Appetizer",
            "price": 5.99,
            "description": "Food",
            "image": "https://media.olivegarden.com/en_us/images/product/d-parties-to-go-half-dozen-breadsticks-dpv.jpg"
        },
        {
            "restaurantId": 11,
            "name": "Brisket Tray",
            "type": "Entrees",
            "price": 25.99,
            "description": "Food",
            "image": "https://images.squarespace-cdn.com/content/v1/63e3d3c41a782b5807a593fc/83e25fdc-5338-4236-a2f2-ebece4f49a32/martinsbbq_121222_final_0039.jpg?format=2500w"
        },
        {
            "restaurantId": 11,
            "name": "Smoked Wings",
            "type": "Appetizer",
            "price": 11.99,
            "description": "Food",
            "image": "https://nashvillelifestyles.com/downloads/11867/download/MartinsBBQ56.jpe?cb=b7ff6bd3539896a9b7909c17e4f2a784"
        },
        {
            "restaurantId": 12,
            "name": "Nourish Bowl",
            "type": "Entrees",
            "price": 15.99,
            "description": "Food",
            "image": "https://131449416.cdn6.editmysite.com/uploads/1/3/1/4/131449416/s484207765175492458_p66_i1_w2448.jpeg?width=2400&optimize=medium"
        },
        {
            "restaurantId": 12,
            "name": "Nourish Burger",
            "type": "Entrees",
            "price": 17.99,
            "description": "Food",
            "image": "https://s3-media0.fl.yelpcdn.com/bphoto/KodzgbQk5GKTd410Dcoh3Q/348s.jpg"
        },
        {
            "restaurantId": 13,
            "name": "Spicy Italian",
            "type": "Entrees",
            "price": 12.99,
            "description": "Food",
            "image": "https://www.blimpie.com/assets/images/product/spicyitalian.png"
        },
        {
            "restaurantId": 13,
            "name": "Turkey Reuben",
            "type": "Entrees",
            "price": 11.99,
            "description": "Food",
            "image": "https://www.blimpie.com/assets/images/product/turkeyreuben.png"
        },
    ]

    for item_data in menu_items_data:
        menu_item = MenuItem(**item_data)
        db.session.add(menu_item)

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
