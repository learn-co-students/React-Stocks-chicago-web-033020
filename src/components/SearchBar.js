import React from 'react';

const SearchBar = (props) => {

  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.sorting === "Alphabetically" ? true : null} onChange={props.handleSortChange}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.sorting === "Price" ? true : null} onChange={props.handleSortChange}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.handleFilterChange}>
          <option value=""></option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
