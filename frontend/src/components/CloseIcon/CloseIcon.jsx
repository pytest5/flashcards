import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function CloseIcon({ to = "./", ...props }) {
  return (
    <Link to={to}>
      <IoMdClose color={"var(--dark-variation)"} size={20} {...props} />
    </Link>
  );
}
