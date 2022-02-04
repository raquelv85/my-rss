import { urls } from "../constants/urls";

export const parseRssFedd = () => {
  let feedInfo = {};
  let articles = [];
  return fetch(urls.FEED)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      const items = data.querySelectorAll("item");
      feedInfo = {
        title: data.querySelector("title").innerHTML,
        description: data.querySelector("description").innerHTML,
      };
      items.forEach((el) => {
        articles.push({
          title: el.querySelector("title").innerHTML,
          author: el.querySelector("author").innerHTML,
          link: el.querySelector("link").innerHTML,
          description: el.querySelector("description").innerHTML,
          categories: el.querySelectorAll("category"),
          date: el.querySelector("pubDate").innerHTML,
        });
      });
      feedInfo.articles = articles;

      return feedInfo;
    });
};
