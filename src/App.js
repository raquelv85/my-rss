import React, { useEffect, useState } from "react";

//scripts
import { parseRssFedd } from "./scripts/parseRSSFeeds";

//components
import { Article } from "./components/Article";

function App() {
  const [resultsFeed, setResultsFeed] = useState({});

  useEffect(() => {
    parseRssFedd().then((res) => {
      setResultsFeed(res);
    });
  }, []);

  return (
    <div className="App">
      {Object.keys(resultsFeed).length > 0 &&
        resultsFeed.articles.map((article, indexArt) => {
          return <Article article={article} />;
        })}
    </div>
  );
}

export default App;
