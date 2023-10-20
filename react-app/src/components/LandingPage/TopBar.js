import React from "react";
import PropTypes from "prop-types";

const TopBar = ({ types, selectedType, onTypeSelect }) => {
  const typeIcons = {
    Chinese: "https://cdn-icons-png.flaticon.com/64/1046/1046791.png",
    American: "https://cdn-icons-png.flaticon.com/64/4803/4803052.png",
    "Fast Food": "https://cdn-icons-png.flaticon.com/64/3703/3703377.png",
    Mexican: "https://cdn-icons-png.flaticon.com/64/4062/4062916.png",
    Pizza: "https://cdn-icons-png.flaticon.com/64/6978/6978255.png",
    Sushi: "https://cdn-icons-png.flaticon.com/64/2252/2252075.png",
    Thai: "https://cdn-icons-png.flaticon.com/64/2095/2095680.png",
    Burgers: "https://cdn-icons-png.flaticon.com/64/5787/5787016.png",
    Indian: "https://cdn-icons-png.flaticon.com/64/6750/6750609.png",
    Wings: "https://cdn-icons-png.flaticon.com/64/5449/5449777.png",
    Italian: "https://cdn-icons-png.flaticon.com/64/4624/4624250.png",
    BBQ: "https://cdn-icons-png.flaticon.com/64/3145/3145213.png",
    Vegan: "https://cdn-icons-png.flaticon.com/64/5635/5635769.png",
    Sandwich: "https://cdn-icons-png.flaticon.com/64/1839/1839039.png",
  };

  return (
    <div className="top-bar-container">
      <div className="top-bar">
        {types.map((type) => (
          <div
            key={type}
            className={`type-item ${type === selectedType ? "active" : ""}`}
            onClick={() => onTypeSelect(type === selectedType ? null : type)}
          >
            <div className="type-icon">
              <img src={typeIcons[type]} alt={type} />
            </div>
            <div className="type-name">{type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

TopBar.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedType: PropTypes.string,
  onTypeSelect: PropTypes.func.isRequired,
};

export default TopBar;
