import { urls } from "../constants/urls";

const getCategories = (categories) => {
  let allCategories = [];
  categories.forEach((category) => {
    allCategories = [...allCategories, category.textContent];
  });
  return allCategories;
};

const slugify = (text) => {
    return text.toLowerCase()
               .replace(/ /g, '-')
               .replace(/[^\w-]+/g, '');
}

export const parseRssFedd = () => {
  let feedInfo = {};
  let articles = [];
  return fetch(urls.FEED)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      const items = data.querySelectorAll("item");

      feedInfo = {
        title: data.querySelector("title").textContent,
        description: data.querySelector("description").textContent
      };
      items.forEach((el) => {
        console.log({ el });
        articles = [
          ...articles,
          {
            title: el.querySelector("title").textContent,
            slug: slugify(el.querySelector("title").textContent),
            author: el.querySelector("author").textContent,
            link: el.querySelector("link").textContent,
            description: el.querySelector("description").textContent,
            categories: getCategories(el.querySelectorAll("category")),
            date: el.querySelector("pubDate").textContent,
          },
        ];
      });
      feedInfo.articles = articles;

      return feedInfo;
    });
};
