import React from "react";
import { Link } from "react-router-dom";

export const Article = (props) => {
  const { article } = props;

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

        {/* <div
        dangerouslySetInnerHTML={{ __html: article.description }}
      ></div> */}
        <br />
      </>
    </Link>
  );
};
