import Link from "next/link";

export interface Tag {
  tag: string;
  href: string;
}
export default function Tags(props: { tags: Tag[] }): JSX.Element {
  return (
    <>
      {props.tags.map((element, index) => (
        <Link key={index} href={element.href}>
          {element.tag}
        </Link>
      ))}
    </>
  );
}
