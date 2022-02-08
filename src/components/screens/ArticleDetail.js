import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const ArticleDetail = (props) => {
  const [article, setArticle] = useState({});
  const [articlesLiked, setArticlesLiked] = useState([]);
  const { id } = useParams();
  const { resultsFeed } = props;

  const formatDate = new Date(article.date).toLocaleString()

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

    setArticlesLiked(newArticlesLiked);
    localStorage.setItem("articles", JSON.stringify(newArticlesLiked));
  };

  useEffect(() => {
    if (Object.keys(resultsFeed).length > 0) {
      setArticle(getArticle());
    }

    setArticlesLiked(JSON.parse(localStorage.getItem("articles")) || []);
  }, [resultsFeed]);

  return (
    <div className="article article--detail">
      {Object.keys(article).length > 0 && (
        <>
          <h2 className="article__title">{article.title}</h2>
          <p className="article__info">{article.author}</p>
          <p className="article__info">{formatDate}</p>
          <div
            className="article__like"
            onClick={() => handleLike(article.slug)}
          >
            {articlesLiked.includes(article.slug) ? (
              <FavoriteBorderIcon sx={{ fontSize: 32 }} />
            ) : (
              <FavoriteIcon sx={{ fontSize: 32 }} />
            )}
          </div>
          <div className="article__categories">
            {article.categories.map((category, indexCat) => {
              return (
                <>
                  <p className="article__categories__item">{`#${category}`}</p> <br />
                </>
              );
            })}
          </div>

          <div
            className="article__description"
            dangerouslySetInnerHTML={{ __html: article.description }}
          ></div>
          <br />
        </>
      )}
    </div>
  );
};
