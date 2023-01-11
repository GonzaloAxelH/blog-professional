import { Inter } from "@next/font/google";
import { GetStaticProps } from "next";
import React from "react";

import { useGetArticles } from "../hooks/useGetArticles";
import slugify from "slugify";
import Link from "next/link";

export default function Home(props: any) {
  //console.log(props.articles);
  return (
    <React.Fragment>
      <ul>
        {props.articles.map((art: any, index: number) => {
          return (
            <li key={index}>
              <Link
                href={`/blog/${slugify(
                  art.properties?.Name?.title[0]?.plain_text
                ).toLowerCase()}`}
              >
                {slugify(
                  art.properties?.Name?.title[0]?.plain_text
                ).toLowerCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await useGetArticles();
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
};
