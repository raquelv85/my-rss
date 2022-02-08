import { useState, useEffect } from "react";

export const useLike = (initialState = []) => {
  const [likes, setLikes] = useState(initialState);


  const handleLike = (slug) => {
    
    let newlikes = [...likes];
    let index = newlikes.findIndex((elem) => elem === slug);

    if (index !== -1) {
      newlikes.splice(index, 1);
    } else {
      newlikes = [...newlikes, slug];
    }

    setLikes(newlikes);
    localStorage.setItem("articles", JSON.stringify(newlikes));
  };

  useEffect(() => {
    setLikes(JSON.parse(localStorage.getItem("articles")) || []);
  }, []);

  return [likes, handleLike];
};
