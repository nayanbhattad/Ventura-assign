import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

export default function Navigator({ navigationItems }) {
  const breadcrumbs = navigationItems.map((item, index) => [
    <Link
      underline="hover"
      key={index + 1}
      className="!text-lightText"
      to={item?.navigate || '#'}
    >
      {item.label}
    </Link>,
  ]);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}
