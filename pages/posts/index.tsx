import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Link from "next/link";
import { CSSProperties } from "react";
import Header from "../../components/header/header";
import Tags, { Tag } from "../../components/tags/tags";
import {
  getAllPostIds,
  getPostMetadata,
  PostsIdInterface,
} from "../../lib/posts";

export default function Posts(props: {
  postData: PostInterface[];
}): JSX.Element {
  const tags: Tag[] = props.postData.map((element) => {
    return { tag: element.tag, href: "/posts/" + element.id };
  });

  const postsByTag: PostInterface[] = [];

  return (
    <div style={container_css}>
      <Header />
      <div style={body_css}>
        <div style={body_izquierda_css}>
          <Tags tags={tags} />
        </div>
        <div style={{ border: "1px solid black" }}>
          {postsByTag.length === 0 &&
            props.postData.map((post) => (
                <Link key={post.id} href={}>
                  {post.id}
                </a>
            ))}

          {postsByTag.length > 0 &&
            postsByTag.map((post) => (
              <a key={post.id} onClick={() => filterPosts(post.tag)}>
                {post.id}
              </a>
            ))}
        </div>
        <div style={{ border: "1px solid black" }}>derecha</div>
      </div>
    </div>
  );

  function filterPosts(tag: string) {
    props.postData.map((element) => {
      if (element.tag === tag) {
        postsByTag.push(element);
      }
    });
  }
}

const body_izquierda_css: CSSProperties = {
  border: "1px solid black",
};

const body_css: CSSProperties = {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "minmax(auto, 300px) 1fr minmax(auto, 300px)",
};
const container_css: CSSProperties = {
  display: "grid",
};

export interface PostInterface {
  contentHtml: string;
  date: string;
  id: string;
  title: string;
  tag: string;
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ postData: PostInterface[] }>
> {
  const allPostsData: PostsIdInterface[] = await getAllPostIds();

  const postsData: PostInterface[] = [];
  for (const post of allPostsData) {
    postsData.push(await getPostMetadata(post.params.id));
  }
  return { props: { postData: postsData } };
}
