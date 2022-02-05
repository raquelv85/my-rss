import React from "react";

export const Article = (props) => {
  const { article } = props;
  return (
    <div>
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

      {/* <div
        dangerouslySetInnerHTML={{ __html: article.description }}
      ></div> */}
      <br />
    </div>
  );
};
