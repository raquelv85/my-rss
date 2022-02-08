import React from "react";

//react router
import { Link } from "react-router-dom";

//custom hook
import { useLike } from "../hooks/useLike";

//material ui lib
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const Article = (props) => {
  const { article } = props;

  const [likes] = useLike([]);

  const formatDate = new Date(article.date).toLocaleString()

  return (
    <Link
      to={{
        pathname: "/article/"+article.slug,
      }}
      className="article__link"
    >
      <>
        <h2 className="article__title">{article.title}</h2>
        <p className="article__info">{article.author}</p>
        <p className="article__info">{formatDate}</p>
        <div className="article__categories">
          {article.categories.map((category, indexCat) => {
            return (  
              <div className="article__categories__item">
                <p>{`#${category}`}</p>
              </div>
            );
          })}
        </div>
        {likes && (
            <div
              className="article__like"
            >
              {likes.includes(article.slug) ? (
                <FavoriteIcon sx={{ fontSize: 28 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 28 }} />
              )}
            </div>
          )}
      </>
    </Link>
  );
};
