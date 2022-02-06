import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ArticleDetail = (props) => {
  const [article, setArticle] = useState({});
  const [articlesLiked, setArticlesLiked] = useState([])
  const { id } = useParams();
  const { resultsFeed } = props;

  const getArticle = () => {
    return resultsFeed.articles.find((article) => article.slug === id);
  };

  const handleLike = (slug) => {
    let newArticlesLiked = [...articlesLiked];
    let index = newArticlesLiked.findIndex((elem) => elem === slug);

    if (index !== -1) {
      newArticlesLiked.splice(index, 1);
    } else {
      newArticlesLiked = [...newArticlesLiked, slug];
    }

    setArticlesLiked(newArticlesLiked)
    localStorage.setItem("articles", JSON.stringify(newArticlesLiked));
  };

  useEffect(() => {
    if (Object.keys(resultsFeed).length > 0) {
      setArticle(getArticle());
    }

    setArticlesLiked(JSON.parse(localStorage.getItem("articles")) || [])
  }, [resultsFeed]);

  return (
    <div>
      {Object.keys(article).length > 0 && (
        <>
          <h2>{article.title}</h2>
          <p>{article.author}</p>
          <p>{article.date}</p>
      <div onClick={() => handleLike(article.slug)}>{articlesLiked.includes(article.slug) ? "dislike" : "like"}</div>
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
