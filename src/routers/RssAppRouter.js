import React, { useState, useEffect } from "react";
//react router
import { Routes, Route, Navigate } from "react-router-dom";
//components
import { ArticleIndex } from "../components/screens/ArticleIndex";
import { ArticleDetail } from "../components/screens/ArticleDetail";
//utils
import { parseRssFedd } from "../utils/parseRSSFeeds";

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
      <Route
        path="*"
        element={<Navigate to="/" />}
    />
    </Routes>
  );
};
