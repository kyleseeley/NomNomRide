import { useState } from "react";

const SideBar = ({ onSort }) => {
  const [selectedCriteria, setSelectedCriteria] = useState("rating");

  const handleSortChange = (criteria) => {
    console.log("sort change", criteria);
    setSelectedCriteria(criteria);
  };

  const handleSortSubmit = () => {
    console.log("selected criteria", selectedCriteria);
    onSort(selectedCriteria);
  };

  return (
    <div className="restaurant-sort-sidebar">
      <h3>Sort By:</h3>
      <label>
        <input
          type="radio"
          name="sortCriteria"
          value="rating"
          checked={selectedCriteria === "rating"}
          onChange={() => handleSortChange("rating")}
        />
        Rating
      </label>
      <label>
        <input
          type="radio"
          name="sortCriteria"
          value="popularity"
          checked={selectedCriteria === "popularity"}
          onChange={() => handleSortChange("popularity")}
        />
        Popularity
      </label>
      <label>
        <input
          type="radio"
          name="sortCriteria"
          value="priceRange"
          checked={selectedCriteria === "priceRange"}
          onChange={() => handleSortChange("priceRange")}
        />
        Price Range
      </label>
      <button className="Submit" onClick={handleSortSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SideBar;
