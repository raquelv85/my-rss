import React, { useEffect, useState } from "react";

//scripts
import { parseRssFedd } from "./scripts/parseRSSFeeds";

function App() {
  const [resultsFeed, setResultsFeed] = useState();
  useEffect(() => {
    parseRssFedd().then((res) => setResultsFeed(res));
  }, []);

  return <div className="App"></div>;
}

export default App;
