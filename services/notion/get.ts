import { Client, isFullPage } from "@notionhq/client";
import slugify from "slugify";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getAllArticles = async (query: any = {}) => {
  const articles: any = [];
  const fullOrPartialPages = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE || "",
  });

  for (const page of fullOrPartialPages.results) {
    if (!isFullPage(page)) {
      continue;
    }

    articles.push(page);
  }
  return JSON.parse(JSON.stringify(articles));
};

export const getArticle = async (id: string) => {
  let blocks = await notion.blocks.children.list({
    block_id: id,
  });
  let content = [...blocks.results];

  return JSON.parse(JSON.stringify(content));
};

export const findArticleBySlug = async (slug: string) => {
  const pages = await getAllArticles();

  const page = pages.find(
    (page: any) =>
      slugify(page.properties.Name?.title[0]?.plain_text).toLowerCase() === slug
  );
  return { idPage: page.id, article: page };
};
