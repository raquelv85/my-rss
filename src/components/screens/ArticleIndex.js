import React, { useState, useEffect } from "react";

import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

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

    if (getCategory !== "") {
      filterArticle = resultsFeed.articles.filter((elem) =>
        elem.categories.some((category) => category === getCategory)
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
    <>
      <header className="header">
        <div className="block-title">
          <h1 className="block-title__title">{resultsFeed.title}</h1>
          <h2 className="block-title__subtitle">{resultsFeed.description}</h2>
        </div>
      </header>
      <main className="main">
        <div className="block-filter">
          <div className="block-filter__element">
            {/* <InputBase
              //sx={{ ml: 1, flex: 1 }}
              variant="standard"
              fullWidth
              placeholder="Search article"
              inputProps={{ "aria-label": "search article" }}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton> */}

            <TextField
              inputProps={{ "aria-label": "search article" }}
              fullWidth
              placeholder="Search article"
              variant="standard"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <SearchIcon
              sx={{ color: "action.active", mr: 1, my: 0.5, fontSize: 20 }}
            />
          </div>
          <div className="block-filter__element">
            <FormControl fullWidth variant="standard">
              {Object.keys(resultsFeed).length > 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //value={}
                  label="Age"
                  onChange={(e) => setGetCategory(e.target.value)}
                >
                  {getCategories().map((category, index) => {
                    return <MenuItem value={category}>{category}</MenuItem>;
                  })}
                </Select>
              )}
            </FormControl>
          </div>
        </div>
        <section className="block-article">
          {Object.keys(resultsFeed).length > 0 &&
            searchArticle().map((article, indexArt) => {
              return (
                <article className="article">
                  <Article key={indexArt} article={article} />
                </article>
              );
            })}
        </section>
      </main>
    </>
  );
};

export default ArticleIndex;
