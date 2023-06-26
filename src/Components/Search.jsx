import React, { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AllData } from "../App";

function Search({ inputRef, selectRef, handelInput, handelSelect }) {
  const { dark } = useContext(AllData);
  return (
    <div className={`search ${dark ? "dark-mode" : ""}`}>
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          <AiOutlineSearch />
          <input
            onChange={handelInput}
            ref={inputRef}
            type="text"
            placeholder="search for a country..."
          />
        </form>
        <div className="select">
          <select onChange={handelSelect} ref={selectRef}>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Search;
