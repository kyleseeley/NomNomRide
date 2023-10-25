import React from "react";

const RestaurantInfo = ({ restaurant }) => {
  return (
    <div className="login-form-container">
      <div className="form-wrapper">
        <table>
          <tr>
            <td>
              <label>Name:</label>
            </td>
            <td>
              <input type="text" value={restaurant.name} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Address:</label>
            </td>
            <td>
              <input type="text" value={restaurant.address} />
            </td>
          </tr>
          <tr>
            <td>
              <label>City:</label>
            </td>
            <td>
              <input type="text" value={restaurant.city} />
            </td>
          </tr>
          <tr>
            <td>
              <label>State:</label>
            </td>
            <td>
              <input type="text" value={restaurant.state} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Image:</label>
            </td>
            <td>
              <input type="text" value={restaurant.iamge} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Type:</label>
            </td>
            <td>
              <input type="text" value={restaurant.type} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Latitude:</label>
            </td>
            <td>
              <input type="text" value={restaurant.lat} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Longitude:</label>
            </td>
            <td>
              <input type="text" value={restaurant.lng} />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default RestaurantInfo;
