import React, { useState, useEffect } from "react";

//material ui
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from '@mui/material/InputLabel';

//components
import { Article } from "../Article";

export const ArticleIndex = (props) => {
  const { resultsFeed } = props;

  const [searchValue, setSearchValue] = useState("");
  const [getCategory, setGetCategory] = useState("");

  const searchArticle = (reset = false) => {
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

    if (reset) {
      filterArticle = resultsFeed.articles;
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

  const handleReset = () => {
    setSearchValue("");
    setGetCategory("");
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
          <div className="block-filter__element block-filter__element--left">
            <TextField
              inputProps={{
                "aria-label": "search article",
                style: { fontSize: "16px" },
              }}
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
            <InputLabel style={{ fontSize: 16,  }} id="demo-simple-select-label">Select category</InputLabel>
              {Object.keys(resultsFeed).length > 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Category"
                  value={getCategory}
                  style={{ fontSize: 16 }}
                  label="Age"
                  onChange={(e) => setGetCategory(e.target.value)}
                >
                  {getCategories().map((category, index) => {
                    return (
                      <MenuItem
                        style={{ fontSize: 16 }}
                        key={index}
                        value={category}
                      >
                        {category}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </FormControl>
          </div>
          {getCategory !== "" && (
            <div
              className="block-filter__box-select"
              onClick={() => handleReset()}
            >
              <p className="block-filter__box-select__text">{getCategory} </p>
              <span>
                <CloseIcon sx={{ fontSize: 16 }} />
              </span>
            </div>
          )}
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
