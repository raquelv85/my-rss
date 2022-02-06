import React, { useState } from "react";

import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

//components
import { Article } from "../Article";

export const ArticleIndex = (props) => {
  const { resultsFeed } = props;

  const [searchValue, setSearchValue] = useState("");

  const searchArticle = () => {
    let filterArticle = resultsFeed.articles;

    if (searchValue !== "") {
      filterArticle = resultsFeed.articles.filter((elem) =>
        elem.title.toUpperCase().includes(searchValue.toUpperCase())
      );
    }
   
    return filterArticle;
  };

  return (
    <div className="App">
      <form>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search article"
            inputProps={{ "aria-label": "search article" }}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>

      {Object.keys(resultsFeed).length > 0 &&
        searchArticle().map((article, indexArt) => {
          return <Article key={indexArt} article={article} />;
        })}
    </div>
  );
};

export default ArticleIndex;
