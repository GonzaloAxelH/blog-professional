import useSWR from "swr";
import React from "react";
import { useGetArticle, useGetArticles } from "../../hooks/useGetArticles";
import slugify from "slugify";

const Page = (props: any) => {
  console.log(props.article);
  console.log(props.content);

  const { data } = useSWR(
    `/api/page-views?slug=/blog/${encodeURIComponent(props.slug)}`,
    async (url: any) => {
      const res = await fetch(url);
      return res.json();
    },
    { revalidateOnFocus: false }
  );
  const views = data?.pageViews || 0;
  return (
    <div>
      <h1>{props.slug}</h1>
      <h1>Views : {views}</h1>
    </div>
  );
};

export async function getStaticPaths() {
  let articles = await useGetArticles();
  let paths: any = [];
  articles.map((art: any) => {
    console.log(slugify(art.properties.Name.title[0].plain_text).toLowerCase());
    paths.push({
      params: {
        slug: slugify(art.properties.Name.title[0].plain_text).toLowerCase(),
      },
    });
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { slug } = context.params;
  const { content, idPage, article } = await useGetArticle(slug);
  return {
    // Passed to the page component as props
    props: { content, article, slug },
    revalidate: 20,
  };
}
export default Page;
