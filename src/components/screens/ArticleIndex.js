import React, { useState, useEffect } from "react";

import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//components
import { Article } from "../Article";

export const ArticleIndex = (props) => {
  const { resultsFeed } = props;

  const [searchValue, setSearchValue] = useState("");
  const [getCategory, setGetCategory] = useState("");

  const searchArticle = () => {
    let filterArticle = resultsFeed.articles;

    if (searchValue !== "") {
      filterArticle = resultsFeed.articles.filter((elem) =>
        elem.title.toUpperCase().includes(searchValue.toUpperCase())
      );
    }

    if(getCategory !== ""){
      
      filterArticle = resultsFeed.articles.filter((elem) =>
        elem.categories.some(category => category === getCategory)
      );
    }
    
    return filterArticle;
  };

  const getCategories = () => {
    let allCategories = [];
    let categories = [];

    resultsFeed.articles.forEach((element) => {
      allCategories = allCategories.concat(element.categories);
    });

    allCategories.forEach((element) => {
      if (!categories.includes(element)) {
        categories = categories.concat(element);
      }
    });

    return categories.sort();
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
          <FormControl fullWidth variant="standard">
            {Object.keys(resultsFeed).length > 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={10}
                label="Age"
                onChange={(e) => setGetCategory(e.target.value)}
              >
                {getCategories().map((category, index) => {
                  return <MenuItem value={category}>{category}</MenuItem>;
                })}
              </Select>
            )}
          </FormControl>
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
