import { isFullPage } from "@notionhq/client";

import {
  getArticle,
  findArticleBySlug,
  getAllArticles,
} from "../services/notion/get";
export async function useGetArticles() {
  const articles = await getAllArticles();
  return articles;
}

export async function useGetArticle(slug: string) {
  const { idPage, article } = await findArticleBySlug(slug);
  const content = await getArticle(idPage);
  return { content, idPage, article };
}
