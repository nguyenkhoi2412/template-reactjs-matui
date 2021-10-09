import "./Breadcrumbs.scss";
import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CollapsedBreadcrumbs() {
  const pathname = window.location.pathname;
  let pathlink = [];
  const arrayPath = pathname.split("/");

  let renderLinkBreadcrumb = arrayPath.map((name, index) => {
    pathlink.push(name);

    const linkto = pathlink.join("/");

    if (name === "") name = <HomeIcon fontSize="small" />;
    return index !== arrayPath.length - 1 ? (
      <Link key={linkto} to={linkto}>
        {name}
      </Link>
    ) : (
      // <Link color="inherit" href={pathlink.join("/")}>
      //   {name}
      // </Link>
      <Typography key={linkto} color="textPrimary">
        {name}
      </Typography>
    );
  });

  return (
    <Breadcrumbs maxItems={3} aria-label="breadcrumb">
      {renderLinkBreadcrumb}
    </Breadcrumbs>
  );
}
