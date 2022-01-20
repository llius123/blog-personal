import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties } from "react";
import { Views } from "../../utils/views";
import UISpacer20px from "../display-components/UISpacer20px";

const githubIcon = "/icons/github.svg";
const linkedinIcon = "/icons/linkedin.svg";

const views = Views;
export default function UIHeader(): JSX.Element {
  return (
    <>
      <div style={header_container_css}>
        <div>
          <div style={header_first_row_container}>
            <h1>Jesus Maria Berisa Nuñez</h1>
            <h2>Full stack developer</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              justifyContent: "center",
              gap: "20px",
              margin: "20px 0 0 0",
            }}
          >
            {views.map((view) => {
              return (
                <div key={view.id}>
                  <Link href={view.href}>{view.title}</Link>
                </div>
              );
            })}
          </div>
        </div>
        <div style={css_links_container}>
          <div style={css_link_item}>
            <Image src={githubIcon} height={30} width={30} />
            <a href={"https://github.com/llius123"} target="_blank">
              Github
            </a>
          </div>
          <div style={css_link_item}>
            <Image src={linkedinIcon} height={30} width={30} />
            <a
              target="_blank"
              href={"https://www.linkedin.com/in/jesusberisanu%C3%B1ez/"}
            >
              Linkedin
            </a>
          </div>
        </div>
      </div>
      <UISpacer20px />
    </>
  );
}
const css_link_item: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
};

const css_links_container: CSSProperties = {
  display: "grid",
  gridAutoFlow: "row",
  alignContent: "center",
  gridTemplateRows: "repeat(2, 1fr)",
};

const header_first_row_container: CSSProperties = {
  textAlign: "center",
};

const header_container_css: CSSProperties = {
  width: "100%",
  maxWidth: "1400px",
  border: "1px solid black",
  justifyContent: "center",
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "90% 10%",
};
