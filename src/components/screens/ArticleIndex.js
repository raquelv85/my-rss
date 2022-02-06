import React from "react";

//components
import { Article } from "../Article";

export const ArticleIndex = (props) => {
  const { resultsFeed } = props;

  return (
    <div className="App">
      {Object.keys(resultsFeed).length > 0 &&
        resultsFeed.articles.map((article, indexArt) => {
          return <Article key={indexArt} article={article} />;
        })}
    </div>
  );
}

export default ArticleIndex;
