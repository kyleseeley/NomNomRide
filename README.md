# NomNomRide

NomNomRide is a partial clone of the website 'UberEat', which is an e-commerce site I've always loved the layout and functionality of this site. It has the right amount of redundancy to make navigation easy and intuitive. The site is visually busy without feeling crowded or messy. We tried our best cloning as many features as the original to make our website functional and look professional. Hope it can give us some spice to our future job hunting and interview!

# Live Link
[(https://nomnomride.onrender.com)]

## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  
 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Index

[Feature List](https://github.com/kyleseeley/NomNomRide/wiki/Feature-List) | [Database Schema](https://github.com/kyleseeley/NomNomRide/wiki/DB-Schema) | [User Stories](https://github.com/kyleseeley/NomNomRide/wiki/User-Stories) | [BackendRoutes](https://github.com/kyleseeley/NomNomRide/wiki/Backend-Routes) | [FrontendRoutes](https://github.com/kyleseeley/NomNomRide/wiki/Frontend-Routes)

# Landing Page

![e6f3875d-c94a-4dff-bccc-c821883f64c5](https://github.com/kyleseeley/NomNomRide/assets/109104101/73bb5318-394d-468b-bf3e-1407e46744c1)


 
 # Product Page
<img width="600px" src="https://github.com/AppBK/Sweetwafer/assets/107947798/975d61c5-5b23-4686-9731-4525f3a9cd16" data-canonical-src="https://sweetwafers3bucket.s3.us-west-1.amazonaws.com/ProductPageSweetwaferCroppedTop.gif">


# Cart
<img src="https://github.com/AppBK/Sweetwafer/assets/107947798/e41c4b1e-73b4-44c6-99b8-f4d01bf38970" data-canonical-src="https://sweetwafers3bucket.s3.us-west-1.amazonaws.com/CartSweetwaferCroppedTop.gif" width="600px" />
 


# Endpoints
## Auth
<table>
 <tr>
  <td>Request</td> <td>Purpose</td> <td>Return Value</td>
 </tr>
  <tr>
  <td>POST /api/auth/signup</td> 
  <td>This api sends the form data signup from data to the backend to process the creation of a new user. It returns an object representing the current user, after logging them in, if account creation succeeds.</td> 
  <td>
   
   ```json
{
    "firstname": STRING,
    "lastname": STRING,
    "email": STRING,
    "username": STRING,
    "address": STRING,
    "city": STRING,
    "state": STRING,
    "lat": NUMBER,
    "lng": NUMBER,
    "password": STRING,
    "id": INTEGER
}

Status: 200
   ```
  </td>
 </tr>
<tr>
 <td>POST /api/auth/login</td>
 <td>"This api attempts to login a user with the provided credentials.
It returns an object representing the current user, if validation succeeds."</td>
 <td>

  ```json
{
    "password": STRING,
    "email": STRING,
    "id": INTEGER
}

Status: 200
```
 </td>
</tr>

<tr>
 <td>POST /api/auth/logout</td>
 <td>"This api will logout the current user.
It returns an object with the message 'User logged Out' if it succeeds."</td>
 <td>

  ```json
{
    "message": STRING
}

Status: 200
```
 </td>
</tr>
</table>

## Restaurants
<table>
  <tr>
  <td>Request</td> <td>Purpose</td> <td>Return Value</td>
 </tr>
<tr>
 <td>GET/api/restaurants/</td>
 <td>This api is sent to retrieve all restaurants brief info. Upon success, we return an array of objects representing that data.</td>
 <td>

  ```json
{
    "restaurants": [
        {
            "address":STRING,
            "city": STRING,
            "id": INTEGER,
            "image": STRING,
            "lat": NUMBER,
            "lng": NUMBER
            "name": STRING,
            "numReviews": INTEGER,
            "ownerId": INTEGER,
            "starRating":NUMBER,
            "state": STRING,
            "type": STRING
        },
        {…},
        …
    ]
}
```
 </td>
</tr>
<tr>
 <td>POST/api/restaurants/</td>
 <td>This api is sent to add a new restaurant to the restaurants table that belongs to the current logged user, we return an object representing the data.</td>
 <td>

  ```json
{
    "address":STRING,
    "city": STRING,
    "id": INTEGER,
    "image": STRING,
    "lat":NUMBER,
    "lng": NUMBER,
    "name": "STRING,
    "numReviews": INTEGER,
    "ownerId":INTEGER,
    "starRating": NUMBER,
    "state": STRING,
    "type": STRING
}
```
 </td>
</tr>
<tr>
 <td>PUT/api/restaurants/:int</td>
 <td>This api is sent to update the restaurant info specified by the user id and the current restaurant. Upon success, we return an object representing the updated restaurant.</td>
 <td>

  ```json
{
    "address":STRING,
    "city": STRING,
    "id": INTEGER,
    "image": STRING,
    "lat":NUMBER,
    "lng": NUMBER,
    "name": "STRING,
    "numReviews": INTEGER,
    "ownerId":INTEGER,
    "starRating": NUMBER,
    "state": STRING,
    "type": STRING
}
```
 </td>
</tr>
<tr>
 <td>DELETE/api/restaurants/:int</td>
 <td>This api is sent to delete the current restaurant. Upon success, we return a message saying it’s deleted successfully and delete the restaurant from database.</td>
 <td>

  ```json
{
    "message":STRING
}
```
 </td>
</tr>
</table>

## MenuItems
<table>
  <tr>
  <td>Request</td> <td>Purpose</td> <td>Return Value</td>
 </tr>
<tr>
 <td>GET/api/restaurants/:int/items</td>
 <td>This api is sent to retrieve all items info for the user specified by the id. Upon success, we return an array of objects representing that data.</td>
 <td>

  ```json
{
    "menuItems": [
        {
            "description": STRING,
            "id": 5,
            "image": STRING,
            "name": STRING,
            "price": "NUMBER,
            "restaurantId": INTEGER,
            "type": STRING
        },{}…]
}
```
 </td>
</tr>
<tr>
 <td>POST/api/restaurants/:int/items</td>
 <td>This api is sent to add a new menu item to the current restaurant that belongs to the current logged user, we return an object representing the data.</td>
 <td>

  ```json
{
    "name":STRING,
    “type":"STRING
}
```
 </td>
</tr>
<tr>
 <td>PUT/api/items/:int</td>
 <td>This api is sent to update the menu item which belonged to the current restaurant from param and specified by the user id. Upon success, we return an object representing the updated restaurant.</td>
 <td>

  ```json
{
    "name":STRING,
    “type":"STRING
}
```
 </td>
</tr>
<tr>
 <td>DELETE/api/items/:int</td>
 <td>This api is sent to delete the current menu item. Upon success, we return a message saying it’s deleted successfully and delete the menu item from database.</td>
 <td>

  ```json
{
    "message": STRING
}
```
 </td>
</tr>
</table>

## Reviews
<table>
<tr>
  <td>Request</td> <td>Purpose</td> <td>Return Value</td>
</tr>
 <tr>
 <td>GET/api/restaurants/:int/reviews</td>
 <td>This api is sent to retrieve all reviews for the restaurant specified by the id. Upon success, we return an array of objects representing that data.</td>
 <td>

  ```json
{“reviews": [
        {
            "createdAt":TIMESTAMP,
            "firstname": STRING,
            "id": INTEGER,
            "lastname": STRING,
            "restaurantId": INTEGER,
            "review": STRING,
            "stars": NUMBER,
            "userId": INTEGER
        },{}…}
```
 </td>
</tr>
<tr>
 <td>POST/api/restaurants/:int/reviews</td>
 <td>This api is sent to post a new review to the current restaurant specified by the id. Upon success, we return an array of objects representing that data.</td>
 <td>

  ```json
{
    "createdAt":TIMESTAMP,
    "id":INTEGER,
    "restaurantId": INTEGER,
    "restaurantName":STRING,
    "review":STRING,
    "stars": NUMBER,
    "userId": INTEGER
}
```
 </td>
</tr>
<tr>
 <td>PUT/api/reviews/:int</td>
 <td>This api is sent to update an existing review to the current restaurant. Upon success, we return an array of objects representing that data.</td>
 <td>

  ```json
{
    "createdAt":TIMESTAMP,
    "id":INTEGER,
    "restaurantId": INTEGER,
    "restaurantName":STRING,
    "review":STRING,
    "stars": NUMBER,
    "userId": INTEGER
}
```
 </td>
</tr>
<tr>
 <td>DELETE/api/reviews/:int</td>
 <td>This api is sent to delete the current review. Upon success, we return a message saying it’s deleted successfully and delete the review from database.</td>
 <td>

  ```json
{“message”:“STRING}
```
 </td>
</tr>
</table>

## ShoppingCart
<table>
<tr>
  <td>Request</td> <td>Purpose</td> <td>Return Value</td>
</tr>
 <tr>
 <td>GET/api/session/shopping-cart</td>
 <td>This api is sent to retrieve all shopping carts, along with all items and restaurant info for the user specified by the id. Upon success, we return an array of objects including cart info, items in the cart as an array, and restaurant data.</td>
 <td>

  ```json
[
    {
        "cart": {
            "id": INTEGER,
            "restaurantId": INTEGER,
            "total": NUMBER
        },
        "items": [
            {
                "cartId": INTEGER,
                "description":STRING,
                "id": INTEGER,
                "image":STRING,
                "menuItemId": INTEGER,
                "name": STRING,
                "price": NUMBER,
                "quantity": INTEGER
            }
        ],
        "restaurant": {
            "address": STRING,
            "city": STRING,
            "name": STRING
        }
    }
]
```
 </td>
</tr>
<tr>
 <td>POST/api/restaurants/:int/shopping-cart</td>
 <td>This api is sent to create a new cart related to the current restaurant, we return an object representing the data.</td>
 <td>

  ```json
{
    "id":INTEGER,
    "restaurantId":INTEGER,
    "total":"NUMBER"
}
```
 </td>
</tr>
<tr>
 <td>DELETE/api/shopping-cart/:int</td>
 <td>This api is sent to delete the current shopping cart. Upon success, we return a message saying it’s deleted successfully.</td>
 <td>

  ```json
{“message”:STRING}
```
 </td>
</tr>
</table>

## ShoppingcartItem
<table>
<tr>
  <td>Request</td> <td>Purpose</td> <td>Return Value</td>
</tr>
 <tr>
 <td>POST/api/items/:int/shopping-cart-items</td>
 <td>This api is sent to create a new cart item in current cart based on the current menu item, we return an object representing the data.</td>
 <td>

  ```json
{
    "cartId": INTEGER,
    "description": STRING,
    "id": INTEGER,
    "image": "STRING,
    "menuItemId": INTEGER,
    "name": STRING,
    "price": NUMBER,
    "quantity": INTEGER
}
```
 </td>
</tr>
<tr>
 <td>PUT/api/shopping-cart-items/:int</td>
 <td>This api is sent to update the quantity of the current item in current cart, we return an object representing the data.</td>
 <td>

  ```json
{
    "cartId": INTEGER,
    "description": STRING,
    "id": INTEGER,
    "image": "STRING,
    "menuItemId": INTEGER,
    "name": STRING,
    "price": NUMBER,
    "quantity": INTEGER
}
```
 </td>
</tr>
<tr>
 <td>DELETE/api/shopping-cart-items/:int</td>
 <td>This api is sent to delete the item from the current cart, we return a message saying it’s deleted successfully.</td>
 <td>

  ```json
{"message":STRING}
```
 </td>
</tr>
</table>


# Future Implementation Goals

1. Implement Googlemap API
2. Stripe payment APi



# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
