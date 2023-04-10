import React from "react";
import "./SearchBox.scss";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = (props) => {
  return (
    <header>
      <div className="header_container">
        <div className="logo">
          <h1>
            COUNTRY <span className="span_header">FINDER</span>{" "}
            <TravelExploreIcon className="icon_header" />
          </h1>
        </div>
        <div className="search">
          <form>
            <input
              type="text"
              placeholder="Search Country"
              value={props.value}
              onChange={props.onChange}
            />
            <button>
              <SearchIcon className="search_button" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default SearchBox;
