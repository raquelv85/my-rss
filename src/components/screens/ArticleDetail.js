import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ArticleDetail = (props) => {
  const [article, setArticle] = useState({});
  const { id } = useParams();
  const { resultsFeed } = props;

  const getArticle = () => {
    return resultsFeed.articles.find((article) => article.slug === id);
  };

  useEffect(() => {
    if(Object.keys(resultsFeed).length > 0){
      setArticle(getArticle());
    }
    
  }, [resultsFeed]);

  return (
    <div>
      {Object.keys(article).length > 0 && (
        <>
          <h2>{article.title}</h2>
          <p>{article.author}</p>
          <p>{article.date}</p>
          <div>
            {article.categories.map((category, indexCat) => {
              return (
                <>
                  <p>{category}</p> <br />
                </>
              );
            })}
          </div>

          <div dangerouslySetInnerHTML={{ __html: article.description }}></div>
          <br />
        </>
      )}
    </div>
  );
};
