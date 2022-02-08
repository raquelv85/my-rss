import React, { useState, useEffect } from "react";

//react router
import { useParams } from "react-router-dom";

//material ui lib
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

//custom hook
import { useLike } from "../../hooks/useLike";

export const ArticleDetail = (props) => {
  const [article, setArticle] = useState({});
  const { id } = useParams();
  const { resultsFeed } = props;

  const [likes, handleLike] = useLike([]);

  const formatDate = new Date(article.date).toLocaleString();

  const getArticle = () => {
    return resultsFeed.articles.find((article) => article.slug === id);
  };

  useEffect(() => {
    if (Object.keys(resultsFeed).length > 0) {
      setArticle(getArticle());
    }
  }, [resultsFeed]);

  return (
    <div className="article article--detail">
      {Object.keys(article).length > 0 && (
        <>
          <h2 className="article__title">{article.title}</h2>
          <p className="article__info">{article.author}</p>
          <p className="article__info">{formatDate}</p>
          {likes && (
            <div
              className="article__like article__like--detail"
              onClick={() => handleLike(article.slug)}
            >
              {likes.includes(article.slug) ? (
                <FavoriteIcon sx={{ fontSize: 32 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 32 }} />
              )}
            </div>
          )}

          <div className="article__categories">
            {article.categories.map((category, indexCat) => {
              return (
                <>
                  <p className="article__categories__item">{`#${category}`}</p>{" "}
                  <br />
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
