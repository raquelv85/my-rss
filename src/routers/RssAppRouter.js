import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
//components
import { ArticleIndex } from "../components/screens/ArticleIndex";
import { ArticleDetail } from "../components/screens/ArticleDetail";
//utils
import { parseRssFedd } from "../utils/parseRSSFeeds";

//styles


export const RssAppRouter = () => {
  const [resultsFeed, setResultsFeed] = useState({});

  useEffect(() => {
    parseRssFedd().then((res) => {
      setResultsFeed(res);
    });
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={<ArticleIndex resultsFeed={resultsFeed} />}
      ></Route>
      <Route
        path="/article/:id"
        element={<ArticleDetail resultsFeed={resultsFeed} />}
      />
    </Routes>
  );
};
