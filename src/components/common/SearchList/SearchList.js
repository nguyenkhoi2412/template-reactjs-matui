import "./SearchList.scss";

import React from "react";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchList = (props) => {
  return (
    <>
      <div className="search-container">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <InputBase
          placeholder={props.placeholder}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </>
  );
};

export default SearchList;
